#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const strict = process.argv.includes("--strict");
const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  if (strict) failures.push(message);
  else warnings.push(message);
}

function exists(relPath) {
  return fs.existsSync(path.join(root, relPath));
}

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), "utf8");
}

function listAgentNames(dir, extension) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) => entry.name.slice(0, -extension.length))
    .sort();
}

function parseClaudeAgent(file) {
  const text = read(file);
  const frontmatter = {};
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (match) {
    for (const line of match[1].split("\n")) {
      const item = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      if (item) frontmatter[item[1]] = item[2].replace(/^["']|["']$/g, "");
    }
  }
  return {
    description: frontmatter.description || "",
    body: text.replace(/^---\n[\s\S]*?\n---\n?/, "").trim(),
  };
}

if (!exists(".claude/agents")) {
  fail(".claude/agents directory missing");
}

const claudeAgents = listAgentNames(".claude/agents", ".md");
const checked = [];

for (const agent of claudeAgents) {
  const claudeFile = `.claude/agents/${agent}.md`;
  const claude = parseClaudeAgent(claudeFile);

  if (!claude.description) fail(`${claudeFile} description missing`);
  if (!claude.body.includes("process/context/all-context.md") && !["git-manager", "innovate-agent"].includes(agent)) {
    warn(`${claudeFile} does not mention process/context/all-context.md`);
  }

  checked.push(agent);
}

const result = {
  checkedClaudeAgents: claudeAgents.length,
  comparedAgents: checked.length,
  warnings,
  failures,
  strict,
};

console.log(JSON.stringify(result, null, 2));

if (failures.length > 0) {
  process.exitCode = 1;
}
