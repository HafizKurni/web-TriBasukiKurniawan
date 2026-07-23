#!/bin/sh
set -e

DB_FILE_PATH=$(echo "$DATABASE_URL" | sed 's/^file://')
DATA_DIR=$(dirname "$DB_FILE_PATH")
mkdir -p "$DATA_DIR"

echo "Applying database migrations..."
npx prisma migrate deploy

SEED_MARKER="$DATA_DIR/.seeded"
if [ ! -f "$SEED_MARKER" ]; then
  echo "First run detected — seeding initial data from CV..."
  npx tsx prisma/seed.ts
  touch "$SEED_MARKER"
else
  echo "Database already seeded, skipping (admin data preserved)."
fi

exec "$@"
