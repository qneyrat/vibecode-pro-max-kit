#!/usr/bin/env bash
set -euo pipefail

# vibecode-pro-max-kit installer
# Full install with safe merge for both new and existing projects.
# After this script, run Claude Code and say "Run vc-setup" to
# auto-detect your project, scaffold process/, and populate context.

REPO="https://github.com/withkynam/vibecode-pro-max-kit.git"
TMPDIR="/tmp/vc-kit-install-$$"
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

INSTALLED=0
PRESERVED=0
BACKED_UP=0
MERGED=0

cleanup() { rm -rf "$TMPDIR" 2>/dev/null; }
trap cleanup EXIT

echo ""
echo "  vibecode-pro-max-kit installer"
echo "  ─────────────────────────────────"
echo ""

# Clone kit to temp
echo "  Fetching kit..."
git clone --depth 1 --quiet "$REPO" "$TMPDIR"

# Read version from manifest
VERSION=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$TMPDIR/vc-manifest.json','utf8')).version)" 2>/dev/null || echo "unknown")
echo "  Kit version: $VERSION"
echo ""

# ── Helper: merge a directory (copy only missing files/dirs) ──
merge_dir() {
  local src="$1" dst="$2"
  mkdir -p "$dst"
  for item in "$src"/*; do
    local name=$(basename "$item")
    if [ ! -e "$dst/$name" ]; then
      cp -R "$item" "$dst/$name"
      INSTALLED=$((INSTALLED + 1))
    else
      MERGED=$((MERGED + 1))
    fi
  done
}

# ── Helper: copy file if missing, preserve if exists ──
copy_or_preserve() {
  local src="$1" dst="$2"
  if [ ! -f "$dst" ]; then
    mkdir -p "$(dirname "$dst")"
    cp "$src" "$dst"
    INSTALLED=$((INSTALLED + 1))
  else
    PRESERVED=$((PRESERVED + 1))
  fi
}

# ── Helper: copy file, backup existing ──
copy_with_backup() {
  local src="$1" dst="$2"
  if [ -f "$dst" ]; then
    cp "$dst" "${dst}.pre-vibecode"
    BACKED_UP=$((BACKED_UP + 1))
    echo -e "    ${YELLOW}Backed up${NC} $dst → ${dst}.pre-vibecode"
  fi
  cp "$src" "$dst"
  INSTALLED=$((INSTALLED + 1))
}

# ══════════════════════════════════════════════════════
# Agents — merge (copy missing, skip existing)
# ══════════════════════════════════════════════════════
echo "  Installing agents..."
merge_dir "$TMPDIR/.claude/agents" ".claude/agents"
merge_dir "$TMPDIR/.codex/agents" ".codex/agents"

# ══════════════════════════════════════════════════════
# Skills — merge (copy missing skill dirs, skip existing)
# ══════════════════════════════════════════════════════
echo "  Installing skills..."
merge_dir "$TMPDIR/.claude/skills" ".claude/skills"

# ══════════════════════════════════════════════════════
# Hooks — merge (copy missing, preserve existing)
# ══════════════════════════════════════════════════════
echo "  Installing hooks..."
merge_dir "$TMPDIR/.claude/hooks" ".claude/hooks"
# Copy hook lib and scout-block subdirs
[ -d "$TMPDIR/.claude/hooks/lib" ] && merge_dir "$TMPDIR/.claude/hooks/lib" ".claude/hooks/lib"
[ -d "$TMPDIR/.claude/hooks/scout-block" ] && merge_dir "$TMPDIR/.claude/hooks/scout-block" ".claude/hooks/scout-block"
# Codex hooks
merge_dir "$TMPDIR/.codex/hooks" ".codex/hooks"
[ -d "$TMPDIR/.codex/hooks/lib" ] && merge_dir "$TMPDIR/.codex/hooks/lib" ".codex/hooks/lib"
[ -d "$TMPDIR/.codex/hooks/scout-block" ] && merge_dir "$TMPDIR/.codex/hooks/scout-block" ".codex/hooks/scout-block"

# ══════════════════════════════════════════════════════
# Config files — preserve existing (user's hook config)
# ══════════════════════════════════════════════════════
echo "  Installing configs..."
copy_or_preserve "$TMPDIR/.claude/settings.json" ".claude/settings.json"
copy_or_preserve "$TMPDIR/.codex/hooks.json" ".codex/hooks.json"
copy_or_preserve "$TMPDIR/.codex/config.toml" ".codex/config.toml"

# ══════════════════════════════════════════════════════
# CLAUDE.md and AGENTS.md — backup existing, install kit version
# ══════════════════════════════════════════════════════
echo "  Installing protocol files..."
copy_with_backup "$TMPDIR/CLAUDE.md" "CLAUDE.md"
copy_with_backup "$TMPDIR/AGENTS.md" "AGENTS.md"

# ══════════════════════════════════════════════════════
# Process directory — seeds + protocols (overwrite managed), preserve user content
# ══════════════════════════════════════════════════════
echo "  Installing process directory..."

# Seeds: always overwrite (managed reference material)
rm -rf process/_seeds 2>/dev/null
mkdir -p process
cp -R "$TMPDIR/process/_seeds" process/
INSTALLED=$((INSTALLED + 1))

# Development protocols: always overwrite (managed system files)
rm -rf process/development-protocols 2>/dev/null
cp -R "$TMPDIR/process/development-protocols" process/
INSTALLED=$((INSTALLED + 1))

# Example PRDs: copy if missing
mkdir -p process/context/planning
copy_or_preserve "$TMPDIR/process/context/planning/example-simple-prd.md" "process/context/planning/example-simple-prd.md"
copy_or_preserve "$TMPDIR/process/context/planning/example-complex-prd.md" "process/context/planning/example-complex-prd.md"

# ══════════════════════════════════════════════════════
# Symlinks
# ══════════════════════════════════════════════════════
echo "  Setting up symlinks..."
mkdir -p .agents
if [ -L ".agents/skills" ]; then
  PRESERVED=$((PRESERVED + 1))
elif [ -d ".agents/skills" ]; then
  rm -rf .agents/skills
  ln -s ../.claude/skills .agents/skills
  INSTALLED=$((INSTALLED + 1))
else
  ln -s ../.claude/skills .agents/skills
  INSTALLED=$((INSTALLED + 1))
fi

# ══════════════════════════════════════════════════════
# Manifest + version
# ══════════════════════════════════════════════════════
cp "$TMPDIR/vc-manifest.json" vc-manifest.json
echo "$VERSION" > .vc-version

cleanup

# ══════════════════════════════════════════════════════
# Summary
# ══════════════════════════════════════════════════════
echo ""
echo -e "  ${GREEN}Install complete.${NC} (v$VERSION)"
echo ""
echo -e "    ${CYAN}Installed${NC}:  $INSTALLED items"
[ $PRESERVED -gt 0 ] && echo -e "    ${YELLOW}Preserved${NC}:  $PRESERVED existing files (your configs are safe)"
[ $BACKED_UP -gt 0 ] && echo -e "    ${YELLOW}Backed up${NC}:  $BACKED_UP files (.pre-vibecode suffix)"
[ $MERGED -gt 0 ] && echo -e "    ${CYAN}Merged${NC}:     $MERGED items (existing kept, missing added)"
echo ""
echo "  Next:"
echo "    1. Run: claude"
echo '    2. Say: "Run vc-setup"'
echo ""
echo "  vc-setup will auto-detect your project, scaffold the process/"
echo "  directory, deep-scan your codebase, and populate context with"
echo "  your real architecture, patterns, test commands, and conventions."
echo ""
[ $BACKED_UP -gt 0 ] && echo -e "  ${YELLOW}Note:${NC} Your original CLAUDE.md was backed up. Move any custom" && echo "  instructions to process/context/all-context.md after setup." && echo ""
