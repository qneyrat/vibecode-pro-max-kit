# Summarize Workflow

Activate `minas:scout` skill to analyze the codebase, read `.minas/process/context/all-context.md`,
update the relevant `.minas/process/context/` summary document, and respond with a concise
summary report.

## Arguments
$1: Focused topics (default: all)
$2: Should scan codebase (`Boolean`, default: `false`)

## Focused Topics
<focused_topics>$1</focused_topics>

## Should Scan Codebase
<should_scan_codebase>$2</should_scan_codebase>

## Important
- Use `.minas/process/context/all-context.md` as the source of truth for documentation discovery.
- Update `.minas/process/context/all-context.md` only for broad repository context.
- Update grouped or topic-specific `.minas/process/context/` files only when the router points to them.
- Run `audit-context` after adding, moving, splitting, or grouping context files.
- Do not scan the entire codebase unless the user explicitly requests it.
- **Do not** start implementing.
