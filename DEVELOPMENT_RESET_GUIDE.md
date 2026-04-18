# Development Reset Guide (Windows / PowerShell)

This project may occasionally hit local Next.js dev cache corruption errors like:

- `Cannot find module './vendor-chunks/next.js'`
- `Cannot find module './vendor-chunks/framer-motion.js'`
- `Cannot find module './682.js'`
- `Cannot find module './937.js'`

These are environment/build-artifact issues (`.next`, dev runtime cache, local dependency state), not app logic issues.

## Daily commands

- `npm run clean`
  - Removes only `.next`.
  - Use when dev starts acting weird but dependencies did not change.

- `npm run dev:clean`
  - Removes `.next` and starts `next dev`.
  - Use when `next dev` fails with runtime chunk/module-not-found errors.

- `npm run build:clean`
  - Removes `.next` and runs `next build`.
  - Use to validate a clean production build state.

## Deep reset (when errors keep coming back)

- `npm run reinstall`
  - Removes `.next`, `node_modules`, and `package-lock.json`, then reinstalls dependencies.
  - Use when `vendor-chunks` or `./xxx.js` missing-module errors persist after a normal clean.

- `npm run kill:node:win` (optional, Windows only)
  - Stops stale `next dev` node processes.
  - Use when you suspect multiple local dev servers for this repo.
  - Does not intentionally kill unrelated Node apps.

## Recovery protocol for `vendor-chunks` / `Cannot find module './xxx.js'`

1. Stop all running `next dev` terminals (avoid multiple dev servers).
2. Run `npm run dev:clean`.
3. If error persists, run `npm run reinstall`.
4. Then validate:
   - `npm run build`
   - `npm run dev`

## Quick recovery (exact order)

1. `npm run dev:clean`
2. if persists: `npm run reinstall`
3. `npm run build`
4. `npm run dev`

If you suspect multiple dev servers, run `npm run kill:node:win` before step 1.

## Stability notes

- Keep only one `next dev` process running at a time.
- To verify port ownership on Windows:
  - `netstat -ano | Select-String ":3000"`
  - If more than one listener appears across unexpected ports, stop stale dev servers and restart with `npm run dev:clean`.
- After large dependency changes, prefer `npm run reinstall` once.
- Next.js `14.2.5` is functional here, but if instability keeps repeating, consider upgrading to a newer patched Next.js 14.x/15.x in a separate controlled task.
