#!/usr/bin/env bash
set -euo pipefail

# Safe Next dev starter:
# - kills other "next dev" processes in this workspace
# - removes stale .next/dev/lock if no process owns it
# - then starts `next dev`

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOCK_FILE="$ROOT_DIR/.next/dev/lock"

echo "[next-dev-safe] workspace: $ROOT_DIR"

echo "[next-dev-safe] finding running 'next dev' processes..."
PIDS=$(pgrep -f "next dev" || true)
if [ -n "$PIDS" ]; then
  echo "[next-dev-safe] found next dev pids:"
  echo "$PIDS"
  echo "[next-dev-safe] sending SIGTERM..."
  echo "$PIDS" | xargs -r kill
  sleep 1
  # force kill remaining
  PIDS_REMAIN=$(pgrep -f "next dev" || true)
  if [ -n "$PIDS_REMAIN" ]; then
    echo "[next-dev-safe] force killing remaining pids:"
    echo "$PIDS_REMAIN"
    echo "$PIDS_REMAIN" | xargs -r kill -9 || true
  fi
else
  echo "[next-dev-safe] no running 'next dev' processes found."
fi

if command -v lsof >/dev/null 2>&1; then
  echo "[next-dev-safe] checking lock owner via lsof..."
  if [ -f "$LOCK_FILE" ]; then
    LOCK_PIDS=$(lsof -t "$LOCK_FILE" || true)
    if [ -n "$LOCK_PIDS" ]; then
      echo "[next-dev-safe] lock is held by pids: $LOCK_PIDS"
      echo "[next-dev-safe] terminating lock holder processes..."
      echo "$LOCK_PIDS" | xargs -r kill
      sleep 1
      LOCK_PIDS_REMAIN=$(lsof -t "$LOCK_FILE" || true)
      if [ -n "$LOCK_PIDS_REMAIN" ]; then
        echo "[next-dev-safe] force killing lock holders: $LOCK_PIDS_REMAIN"
        echo "$LOCK_PIDS_REMAIN" | xargs -r kill -9 || true
      fi
    else
      echo "[next-dev-safe] no process holds the lock file. Removing stale lock."
      rm -f "$LOCK_FILE" || true
    fi
  fi
else
  echo "[next-dev-safe] lsof not available; will remove stale lock if present and no next process is running."
  if [ -f "$LOCK_FILE" ]; then
    if [ -z "$(pgrep -f 'next dev' || true)" ]; then
      echo "[next-dev-safe] removing stale lock file"
      rm -f "$LOCK_FILE" || true
    else
      echo "[next-dev-safe] next dev processes still running; not removing lock."
    fi
  fi
fi

echo "[next-dev-safe] starting next dev"
cd "$ROOT_DIR"
# Start next directly to avoid recursion (don't call `npm run dev` which invokes this script)
if command -v npx >/dev/null 2>&1; then
  exec npx next dev
else
  exec ./node_modules/.bin/next dev
fi
