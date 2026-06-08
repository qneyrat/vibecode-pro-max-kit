#!/usr/bin/env node
'use strict';

try {
  const fs = require('fs');
  const { isHookEnabled } = require('./lib/minas-config-utils.cjs');
  const { createHookTimer, logHookCrash } = require('./lib/hook-logger.cjs');
  const { refreshStatuslineSnapshot } = require('./lib/session-state-manager.cjs');

  const REFRESH_EVENTS = new Set(['PostToolUse', 'Stop', 'SubagentStop']);

  async function handleSessionStateEvent(payload = {}, deps = {}) {
    const {
      enabled = isHookEnabled('session-state'),
      refresh = refreshStatuslineSnapshot
    } = deps;

    if (!enabled) {
      return { ok: true, action: 'skipped-disabled' };
    }

    const sessionId = payload.session_id || '';
    if (!sessionId) {
      return { ok: true, action: 'skipped-no-session' };
    }

    const eventType = payload.hook_event_name || payload.event || 'unknown';
    let refreshed = false;

    if (REFRESH_EVENTS.has(eventType)) {
      const result = await refresh(payload);
      refreshed = Boolean(result && result.success);
    }

    return {
      ok: true,
      action: refreshed ? 'handled' : 'noop',
      eventType,
      refreshed
    };
  }

  async function main() {
    const timer = createHookTimer('session-state', { event: 'SessionState' });
    try {
      const stdin = fs.readFileSync(0, 'utf-8').trim();
      const payload = stdin ? JSON.parse(stdin) : {};
      const result = await handleSessionStateEvent(payload);
      timer.end({
        status: 'ok',
        exit: 0,
        note: result.action,
        event: result.eventType || 'unknown'
      });
      process.exit(0);
    } catch (error) {
      timer.end({ status: 'crash', exit: 0, note: error.message });
      logHookCrash('session-state', error, { event: 'SessionState' });
      process.exit(0);
    }
  }

  if (require.main === module) {
    main();
  } else {
    module.exports = { handleSessionStateEvent };
  }
} catch (error) {
  try {
    const { logHookCrash } = require('./lib/hook-logger.cjs');
    logHookCrash('session-state', error, { event: 'SessionState' });
  } catch (_) {}
  process.exit(0);
}
