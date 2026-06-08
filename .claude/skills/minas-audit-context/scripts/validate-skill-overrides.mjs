#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function abs(relPath) {
  return path.join(root, relPath);
}

function exists(relPath) {
  return fs.existsSync(abs(relPath));
}

function read(relPath) {
  return fs.readFileSync(abs(relPath), "utf8");
}

function parseFrontmatter(file) {
  const text = read(file);
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  return Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/))
      .filter(Boolean)
      .map((item) => [item[1], item[2].replace(/^["']|["']$/g, "")]),
  );
}

const settingsPath = ".claude/settings.json";
if (!exists(settingsPath)) {
  fail(`${settingsPath} missing`);
}
const settings = exists(settingsPath) ? JSON.parse(read(settingsPath)) : {};
const skillOverrides = settings.skillOverrides && typeof settings.skillOverrides === "object"
  ? settings.skillOverrides
  : {};

const policyPath = ".claude/skills/minas-audit-context/references/skill-overrides-policy.json";
if (!exists(policyPath)) {
  fail(`${policyPath} missing`);
}
const policy = exists(policyPath)
  ? JSON.parse(read(policyPath))
  : { expectedValue: "name-only", fullDescriptionSkills: {} };

const expectedValue = typeof policy.expectedValue === "string" ? policy.expectedValue : "name-only";
const fullDescriptionSkills = policy.fullDescriptionSkills && typeof policy.fullDescriptionSkills === "object"
  ? policy.fullDescriptionSkills
  : {};

const skillsDir = abs(".claude/skills");
const skillDirs = fs.existsSync(skillsDir)
  ? fs.readdirSync(skillsDir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort()
  : [];

// invocable name (frontmatter `name:`, e.g. "minas:scout") → dir, for the reverse stale-key check.
const invocableToDir = new Map();
let nameOnlyCount = 0;
let fullDescriptionCount = 0;

for (const skill of skillDirs) {
  const file = `.claude/skills/${skill}/SKILL.md`;
  if (!exists(file)) {
    fail(`${file} missing`);
    continue;
  }

  const invocable = parseFrontmatter(file).name;
  if (!invocable) {
    fail(`${file} has no \`name:\` frontmatter — cannot map it to a skillOverrides key`);
    continue;
  }
  invocableToDir.set(invocable, skill);

  const isOpaque = Object.prototype.hasOwnProperty.call(fullDescriptionSkills, skill);

  if (isOpaque) {
    fullDescriptionCount += 1;
    const reason = fullDescriptionSkills[skill];
    if (typeof reason !== "string" || reason.trim().length < 12) {
      fail(`${policyPath} fullDescriptionSkills entry for ${skill} needs a real reason (why its description stays full)`);
    }
    if (Object.prototype.hasOwnProperty.call(skillOverrides, invocable)) {
      const value = skillOverrides[invocable];
      if (value === expectedValue) {
        fail(`${skill} (${invocable}) is allowlisted as full-description but set to "${expectedValue}" in ${settingsPath} — remove it from skillOverrides or from the policy allowlist`);
      } else {
        warn(`${skill} (${invocable}) is allowlisted as full-description and also listed in ${settingsPath} as "${value}" — redundant (the default is already full); drop the entry`);
      }
    }
    continue;
  }

  if (!Object.prototype.hasOwnProperty.call(skillOverrides, invocable)) {
    fail(`${skill} (${invocable}) is not classified: add "${invocable}": "${expectedValue}" to ${settingsPath} skillOverrides, or allowlist it as full-description in ${policyPath}`);
    continue;
  }
  const value = skillOverrides[invocable];
  if (value !== expectedValue) {
    fail(`${skill} (${invocable}) is "${value}" in ${settingsPath} but should be "${expectedValue}" (or be allowlisted as full-description in ${policyPath})`);
    continue;
  }
  nameOnlyCount += 1;
}

// Reverse: every skillOverrides key must map to an existing skill.
for (const key of Object.keys(skillOverrides)) {
  if (!invocableToDir.has(key)) {
    warn(`${settingsPath} skillOverrides has "${key}", but no skill in .claude/skills/ declares that name — stale entry`);
  }
}

// Reverse: every allowlisted skill folder must still exist.
for (const skill of Object.keys(fullDescriptionSkills)) {
  if (!skillDirs.includes(skill)) {
    warn(`${policyPath} allowlists ${skill}, but the skill folder no longer exists`);
  }
}

console.log(JSON.stringify({
  checkedSkills: skillDirs.length,
  expectedValue,
  nameOnlyCount,
  fullDescriptionCount,
  overrideKeys: Object.keys(skillOverrides).length,
  warnings,
  failures,
}, null, 2));

if (failures.length > 0) {
  process.exitCode = 1;
}
