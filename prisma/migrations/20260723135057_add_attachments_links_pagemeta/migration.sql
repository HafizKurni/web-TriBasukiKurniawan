-- AlterTable
ALTER TABLE "Certification" ADD COLUMN "fileUrl" TEXT;
ALTER TABLE "Certification" ADD COLUMN "link" TEXT;

-- AlterTable
ALTER TABLE "CustomLink" ADD COLUMN "fileUrl" TEXT;

-- AlterTable
ALTER TABLE "Education" ADD COLUMN "fileUrl" TEXT;
ALTER TABLE "Education" ADD COLUMN "link" TEXT;

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN "fileUrl" TEXT;
ALTER TABLE "Experience" ADD COLUMN "link" TEXT;

-- AlterTable
ALTER TABLE "Publication" ADD COLUMN "fileUrl" TEXT;

-- AlterTable
ALTER TABLE "ResearchInterest" ADD COLUMN "fileUrl" TEXT;
ALTER TABLE "ResearchInterest" ADD COLUMN "link" TEXT;

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN "fileUrl" TEXT;
ALTER TABLE "Skill" ADD COLUMN "link" TEXT;

-- AlterTable
ALTER TABLE "Teaching" ADD COLUMN "fileUrl" TEXT;

-- CreateTable
CREATE TABLE "PageMeta" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "description" TEXT
);
