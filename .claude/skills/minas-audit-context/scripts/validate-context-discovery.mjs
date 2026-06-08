#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const warnings = [];
const ignoredSkillFrontmatter = new Set(["sync-from-riper5", "sync-to-riper5"]);

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function exists(relPath) {
  return fs.existsSync(path.join(root, relPath));
}

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), "utf8");
}

function walk(dir, predicate, out = []) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) return out;
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(rel, predicate, out);
    else if (!predicate || predicate(rel)) out.push(rel);
  }
  return out;
}

function assertContains(file, needle) {
  if (!exists(file)) {
    fail(`${file} missing`);
    return;
  }
  if (!read(file).includes(needle)) {
    fail(`${file} does not mention ${needle}`);
  }
}

function listDirs(relPath) {
  const abs = path.join(root, relPath);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function listFiles(relPath, extension) {
  const abs = path.join(root, relPath);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) => entry.name.replace(new RegExp(`${extension}$`), ""))
    .sort();
}

function getGroupEntrypoint(group) {
  const canonical = `.minas/process/context/${group}/all-${group}.md`;
  return exists(canonical) ? canonical : null;
}

const legacyEntrypoints = [
  ".minas/process/context/README.md",
  ".minas/process/context/tests.md",
  ...walk(".minas/process/context", (rel) => /\/README\.md$/.test(rel) || /\/[^/]+-README\.md$/.test(rel)),
];

function parseFrontmatter(file) {
  const text = read(file);
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  return Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/))
      .filter(Boolean)
      .map((match) => [match[1], match[2].replace(/^["']|["']$/g, "")]),
  );
}

const agentsSkills = path.join(root, ".agents/skills");
if (!fs.existsSync(agentsSkills)) {
  fail(".agents/skills missing");
} else {
  const real = fs.realpathSync(agentsSkills);
  const expected = fs.realpathSync(path.join(root, ".claude/skills"));
  if (real !== expected) fail(".agents/skills does not resolve to .claude/skills");
}

for (const skill of ["minas-audit-context", "minas-audit-plans", "minas-generate-context", "minas-generate-plan"]) {
  const file = `.claude/skills/${skill}/SKILL.md`;
  const mirrorPath = `.agents/skills/${skill}/SKILL.md`;
  if (!exists(file)) fail(`${file} missing`);
  if (!exists(mirrorPath)) fail(`${mirrorPath} missing`);
  if (exists(file)) {
    const fm = parseFrontmatter(file);
    // YAML name uses colon (minas:audit-context), folder uses dash (minas-audit-context)
    const expectedName = skill.replace("minas-", "minas:");
    if (fm.name !== skill && fm.name !== expectedName) fail(`${file} frontmatter name is ${fm.name || "missing"}, expected ${expectedName}`);
    if (!fm.description) fail(`${file} frontmatter description missing`);
  }
}

const skillDirs = listDirs(".claude/skills");
let checkedSkills = 0;
for (const skill of skillDirs) {
  const file = `.claude/skills/${skill}/SKILL.md`;
  const mirrorPath = `.agents/skills/${skill}/SKILL.md`;
  if (!exists(file)) {
    fail(`${file} missing`);
    continue;
  }
  if (!exists(mirrorPath)) fail(`${mirrorPath} missing`);
  checkedSkills += 1;

  const fm = parseFrontmatter(file);
  if (!ignoredSkillFrontmatter.has(skill) && (!fm.name || !fm.description)) {
    fail(`${file} missing name/description frontmatter`);
  }
  if (ignoredSkillFrontmatter.has(skill) && (!fm.name || !fm.description)) {
    warn(`${file} has incomplete frontmatter but is intentionally ignored`);
  }
}

const claudeAgents = listFiles(".claude/agents", ".md");

const router = ".minas/process/context/all-context.md";
if (!exists(router)) fail(`${router} missing`);
const routerText = exists(router) ? read(router) : "";

const contextDocs = walk(".minas/process/context", (rel) => rel.endsWith(".md")).sort();
for (const doc of contextDocs) {
  if (doc === router) continue;
  const relFromContext = doc.replace(/^\.minas\/process\/context\//, "");
  const group = relFromContext.split("/")[0];
  const groupEntrypoint = getGroupEntrypoint(group);
  const indexedByRouter = routerText.includes(relFromContext) || routerText.includes(doc);
  const indexedByGroup = groupEntrypoint && read(groupEntrypoint).includes(path.basename(doc));

  if (relFromContext.includes("/") && !groupEntrypoint) {
    fail(`context group ${group} is missing all-${group}.md`);
  }
  if (!indexedByRouter && !indexedByGroup) {
    fail(`${doc} is not indexed by .minas/process/context/all-context.md or its group entrypoint`);
  }
}

if (exists(".minas/process/context")) {
  for (const dir of fs.readdirSync(path.join(root, ".minas/process/context"), { withFileTypes: true })) {
    if (dir.isDirectory() && !getGroupEntrypoint(dir.name)) {
      fail(`.minas/process/context/${dir.name}/ is missing all-${dir.name}.md`);
    }
  }
}

for (const legacy of legacyEntrypoints) {
  if (exists(legacy)) {
    fail(`legacy context entrypoint still exists: ${legacy}`);
  }
}

for (const file of [
  ".minas/CLAUDE.md",
  ".claude/agents/minas-update-process-agent.md",
  ".claude/agents/minas-research-agent.md",
  ".claude/skills/minas-generate-context/SKILL.md",
  ".claude/skills/minas-generate-context/references/generate-context.md",
]) {
  assertContains(file, ".minas/process/context/all-context.md");
}

const staleWorkflowPatterns = [
  { pattern: "docs-manager", reason: "use update-process-agent for project context/process docs" },
  { pattern: "project-manager", reason: "use update-process-agent for plan/process sync" },
  { pattern: "docs/codebase-summary", reason: "use .minas/process/context/all-context.md routing" },
  { pattern: "docs/design-guidelines", reason: "use .minas/process/context/uxui/uiux.md or feature references" },
  { pattern: "validate-docs", reason: "use audit-context validator" },
  { pattern: ".minas/process/context/<group>", reason: "placeholder should not look like a concrete ref" },
  { pattern: ".claude/commands/", reason: "Claude command aliases are retired from the active shared workflow surface" },
  { pattern: "minas:plan", reason: "planning ownership was absorbed into minas-generate-plan + plan-agent" },
  { pattern: "minas:research", reason: "research ownership was absorbed into research-agent" },
  { pattern: "minas:cook", reason: "execution ownership was absorbed into execute-agent" },
  { pattern: "minas:fix", reason: "bug-fix ownership was absorbed into debugger + execute-agent" },
  { pattern: "minas:code-review", reason: "review ownership was absorbed into code-reviewer" },
  { pattern: "/minas:journal", reason: "journal handoff is not part of the surviving default workflow surface" },
];
const staleWorkflowFiles = [
  ".minas/CLAUDE.md",
  ...walk(".claude/agents", (rel) => rel.endsWith(".md")),
  ...walk(".claude/skills", (rel) => rel.endsWith(".md") && !rel.includes("/scripts/")),
  ...walk(".claude/hooks", (rel) => rel.endsWith(".cjs") || rel.endsWith(".json")),
  ...walk(".minas/process/context", (rel) => rel.endsWith(".md")),
];

for (const file of staleWorkflowFiles) {
  if (!exists(file)) continue;
  const lines = read(file).split("\n");
  for (const [index, line] of lines.entries()) {
    for (const { pattern, reason } of staleWorkflowPatterns) {
      if (!line.includes(pattern)) continue;
      if (
        line.includes("formerly taught") ||
        line.includes("previously taught") ||
        line.includes("previously spread across") ||
        line.includes("previously split across") ||
        line.includes("migration sources only") ||
        line.includes("absorbed into") ||
        line.includes("absorbed here")
      ) {
        continue;
      }
      if (pattern === "docs-manager" && line.includes("not `./docs`")) continue;
      fail(`${file}:${index + 1} contains stale ${pattern} reference (${reason})`);
    }
    if (line.includes("`./docs`") && !line.includes("not `./docs`")) {
      fail(`${file}:${index + 1} references legacy ./docs path (use .minas/process/context/all-context.md)`);
    }
  }
}

const filesWithRefs = [
  ".minas/CLAUDE.md",
  ...walk(".claude", (rel) => rel.endsWith(".md") || rel.endsWith(".json")),
  ...walk(".minas/process/context", (rel) => rel.endsWith(".md")),
];

const concreteRefs = [];
for (const file of filesWithRefs) {
  if (!exists(file)) continue;
  const text = read(file);
  for (const match of text.matchAll(/`(\.minas\/process\/context\/[^`\s]+)`/g)) {
    const ref = match[1].replace(/[.,;:]$/, "");
    if (/[{}[*\]]/.test(ref)) continue;
    concreteRefs.push({ file, ref });
  }
}

for (const { file, ref } of concreteRefs) {
  if (!exists(ref)) fail(`${file} references missing ${ref}`);
}

if (contextDocs.length > 0 && !routerText.includes("Context Group Lifecycle")) {
  fail(`${router} missing Context Group Lifecycle section`);
}

if (routerText.includes("Suggested future groups")) {
  warn("context group migration is planned but not fully executed yet");
}

const result = {
  checkedContextDocs: contextDocs.length,
  checkedConcreteRefs: concreteRefs.length,
  checkedSkills,
  checkedClaudeAgents: claudeAgents.length,
  warnings,
  failures,
};

console.log(JSON.stringify(result, null, 2));

if (failures.length > 0) {
  process.exitCode = 1;
}
