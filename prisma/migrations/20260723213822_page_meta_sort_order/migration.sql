-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PageMeta" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_PageMeta" ("description", "slug", "title") SELECT "description", "slug", "title" FROM "PageMeta";
DROP TABLE "PageMeta";
ALTER TABLE "new_PageMeta" RENAME TO "PageMeta";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
