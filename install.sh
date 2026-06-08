#!/usr/bin/env bash
set -euo pipefail

# minas-kit installer
# Clean install with backup for both new and existing projects.
# Replaces .claude/, .agents/ with kit versions.
# Preserves: .minas/process/ (user content), .claude/settings.json (user config).
# After this script, run Claude Code and say "Run minas-setup" to
# auto-detect your project, scaffold .minas/process/, and populate context.
#
# Source resolution (where the kit files are copied FROM):
#   Remote (default):  curl -fsSL .../install.sh | bash   # clones the repo
#   Local checkout:    /path/to/kit/install.sh            # auto-detects local source
#                      /path/to/kit/install.sh --local    # force local source
#                      ./install.sh --source /path/to/kit # explicit source dir
# It always installs INTO the current directory, so cd into the target
# project first.

REPO="https://github.com/qneyrat/vibecode-pro-max-kit.git"  # tolerated: external repo URL, not branding
TMPDIR="/tmp/minas-kit-install-$$"
BACKUP_DIR=".minas-backup"
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

cleanup() { rm -rf "$TMPDIR" 2>/dev/null; }
trap cleanup EXIT

# Resolve this script's own directory, so a local checkout can install from
# itself without cloning. When piped via `curl | bash`, BASH_SOURCE is not a
# real file on disk, so SCRIPT_DIR stays empty and we fall back to cloning.
SCRIPT_DIR=""
if [ -n "${BASH_SOURCE[0]:-}" ] && [ -f "${BASH_SOURCE[0]:-}" ]; then
  SCRIPT_DIR="$(cd -P "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)"
fi

# Parse args: --local (use this checkout) / --source <dir> (explicit kit dir).
SRC_DIR=""
FORCE_LOCAL=false
while [ $# -gt 0 ]; do
  case "$1" in
    --local) FORCE_LOCAL=true; shift ;;
    --source) SRC_DIR="${2:-}"; shift 2 ;;
    --source=*) SRC_DIR="${1#--source=}"; shift ;;
    -h|--help)
      echo "Usage: install.sh [--local | --source <kit-dir>]"
      echo "  (no args)            clone the kit from GitHub and install"
      echo "  --local              install from this checkout (auto when run locally)"
      echo "  --source <kit-dir>   install from an explicit kit directory"
      echo "Installs into the current directory. cd into your target project first."
      exit 0 ;;
    *) echo "  Unknown argument: $1 (try --help)"; exit 1 ;;
  esac
done

echo ""
echo "  minas-kit installer"
echo "  ─────────────────────────────────"
echo ""

# ══════════════════════════════════════════════════════
# Preflight: Node.js required
# ══════════════════════════════════════════════════════
if ! command -v node &>/dev/null; then
  echo "  Error: Node.js is required but not found in PATH."
  echo "  Install Node.js >= 22 and try again."
  exit 1
fi

# ══════════════════════════════════════════════════════
# Resolve source: local checkout or fresh clone
# ══════════════════════════════════════════════════════
if [ -z "$SRC_DIR" ] && [ "$FORCE_LOCAL" = true ]; then
  SRC_DIR="$SCRIPT_DIR"
elif [ -z "$SRC_DIR" ] && [ -n "$SCRIPT_DIR" ] && [ -f "$SCRIPT_DIR/minas-manifest.json" ]; then
  # Auto-detect: install.sh was run from inside a kit checkout.
  SRC_DIR="$SCRIPT_DIR"
fi

if [ -n "$SRC_DIR" ]; then
  if [ ! -f "$SRC_DIR/minas-manifest.json" ] || [ ! -f "$SRC_DIR/resolve-manifest.mjs" ]; then
    echo "  Error: '$SRC_DIR' is not a minas-kit checkout (manifest not found)."
    exit 1
  fi
  SRC_DIR="$(cd -P "$SRC_DIR" && pwd)"
  if [ "$SRC_DIR" = "$(pwd -P)" ]; then
    echo "  Error: target is the kit source itself. cd into your project first."
    exit 1
  fi
  echo -e "  Source: local checkout ${CYAN}$SRC_DIR${NC}"
else
  echo "  Fetching kit..."
  git clone --depth 1 --quiet "$REPO" "$TMPDIR"
  SRC_DIR="$TMPDIR"
fi

# Read version from manifest
VERSION=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$SRC_DIR/minas-manifest.json','utf8')).version)" 2>/dev/null || echo "unknown")
echo "  Kit version: $VERSION"
echo ""

# ══════════════════════════════════════════════════════
# Resolve manifest to get file list + metadata
# ══════════════════════════════════════════════════════
MANIFEST_JSON=$(node "$SRC_DIR/resolve-manifest.mjs" --root "$SRC_DIR" --json 2>/dev/null)
if [ -z "$MANIFEST_JSON" ]; then
  echo "  Error: Failed to resolve manifest. Check Node.js version (>= 22 required)."
  exit 1
fi

# Extract file list, merge list, copyIfMissing list, and symlinks from JSON
FILES=$(echo "$MANIFEST_JSON" | node -e "
  const d = JSON.parse(require('fs').readFileSync(0,'utf8'));
  d.files.forEach(f => console.log(f));
")
MERGE_FILES=$(echo "$MANIFEST_JSON" | node -e "
  const d = JSON.parse(require('fs').readFileSync(0,'utf8'));
  d.merge.forEach(f => console.log(f));
")
COPY_IF_MISSING=$(echo "$MANIFEST_JSON" | node -e "
  const d = JSON.parse(require('fs').readFileSync(0,'utf8'));
  d.copyIfMissing.forEach(f => console.log(f));
")
SYMLINKS_JSON=$(echo "$MANIFEST_JSON" | node -e "
  const d = JSON.parse(require('fs').readFileSync(0,'utf8'));
  for (const [k,v] of Object.entries(d.symlinks)) console.log(k + '|' + v);
")

# ══════════════════════════════════════════════════════
# Backup existing setup (if any)
# ══════════════════════════════════════════════════════
HAS_EXISTING=false
if [ -d ".claude" ] || [ -d ".agents" ]; then
  HAS_EXISTING=true
  echo -e "  ${YELLOW}Existing setup detected.${NC} Backing up..."
  mkdir -p "$BACKUP_DIR"

  # Back up directories
  [ -d ".claude" ] && cp -R .claude "$BACKUP_DIR/.claude" && echo -e "    ${YELLOW}Backed up${NC} .claude/"
  [ -d ".agents" ] && cp -R .agents "$BACKUP_DIR/.agents" && echo -e "    ${YELLOW}Backed up${NC} .agents/"

  echo -e "    Backup at: ${CYAN}$BACKUP_DIR/${NC}"
  echo ""

  # Clean slate — remove old agent tooling dirs
  rm -rf .claude .agents
fi

# ══════════════════════════════════════════════════════
# Install kit — resolver-driven copy
# ══════════════════════════════════════════════════════
INSTALLED_COUNT=0
SKIPPED_MERGE=0
SKIPPED_COPY_IF_MISSING=0

echo "  Installing files..."

while IFS= read -r file; do
  [ -z "$file" ] && continue

  # Check if this file is in the merge list AND exists locally
  IS_MERGE=false
  while IFS= read -r mf; do
    [ "$file" = "$mf" ] && IS_MERGE=true && break
  done <<< "$MERGE_FILES"

  if [ "$IS_MERGE" = true ] && [ -f "$file" ]; then
    SKIPPED_MERGE=$((SKIPPED_MERGE + 1))
    continue
  fi

  # Check if this file is in the copyIfMissing list AND exists locally
  IS_COPY_IF_MISSING=false
  while IFS= read -r cim; do
    [ "$file" = "$cim" ] && IS_COPY_IF_MISSING=true && break
  done <<< "$COPY_IF_MISSING"

  if [ "$IS_COPY_IF_MISSING" = true ] && [ -f "$file" ]; then
    SKIPPED_COPY_IF_MISSING=$((SKIPPED_COPY_IF_MISSING + 1))
    continue
  fi

  # Create parent directory and copy
  mkdir -p "$(dirname "$file")"
  cp "$SRC_DIR/$file" "$file"
  INSTALLED_COUNT=$((INSTALLED_COUNT + 1))
done <<< "$FILES"

# ══════════════════════════════════════════════════════
# Symlinks
# ══════════════════════════════════════════════════════
echo "  Setting up symlinks..."
while IFS= read -r line; do
  [ -z "$line" ] && continue
  LINK_PATH="${line%%|*}"
  LINK_TARGET="${line##*|}"
  mkdir -p "$(dirname "$LINK_PATH")"
  # Remove existing (wrong symlink or real dir)
  [ -e "$LINK_PATH" ] || [ -L "$LINK_PATH" ] && rm -rf "$LINK_PATH"
  ln -sf "$LINK_TARGET" "$LINK_PATH"
done <<< "$SYMLINKS_JSON"

# ══════════════════════════════════════════════════════
# Write snapshot + version
# ══════════════════════════════════════════════════════
echo "$FILES" | sort > .minas-installed-files
echo "$VERSION" > .minas-version

cleanup

# ══════════════════════════════════════════════════════
# Summary
# ══════════════════════════════════════════════════════
AGENT_COUNT=$(ls .claude/agents/*.md 2>/dev/null | wc -l | tr -d ' ')
SKILL_COUNT=$(ls -d .claude/skills/*/ 2>/dev/null | wc -l | tr -d ' ')
HOOK_COUNT=$(ls .claude/hooks/*.cjs 2>/dev/null | wc -l | tr -d ' ')

echo ""
echo -e "  ${GREEN}Install complete.${NC} (v$VERSION)"
echo ""
echo -e "    ${CYAN}Agents${NC}:     $AGENT_COUNT (Claude Code)"
echo -e "    ${CYAN}Skills${NC}:     $SKILL_COUNT"
echo -e "    ${CYAN}Hooks${NC}:      $HOOK_COUNT"
echo -e "    ${CYAN}Files${NC}:      $INSTALLED_COUNT installed"
if [ "$SKIPPED_MERGE" -gt 0 ]; then
  echo -e "    ${CYAN}Merge${NC}:      $SKIPPED_MERGE preserved (user config)"
fi
if [ "$SKIPPED_COPY_IF_MISSING" -gt 0 ]; then
  echo -e "    ${CYAN}Existing${NC}:   $SKIPPED_COPY_IF_MISSING skipped (already present)"
fi

if [ "$HAS_EXISTING" = true ]; then
  echo ""
  echo -e "  ${YELLOW}Previous setup backed up to ${CYAN}$BACKUP_DIR/${NC}"
  echo -e "  ${YELLOW}Your .minas/process/ directory was preserved (plans, context, features).${NC}"
fi

echo ""
echo "  Next:"
echo "    1. Run: claude"
echo '    2. Say: "Run minas-setup"'
echo ""
echo "  minas-setup will auto-detect your project, scaffold the .minas/process/"
echo "  directory, deep-scan your codebase, and populate context with"
echo "  your real architecture, patterns, test commands, and conventions."
echo ""
