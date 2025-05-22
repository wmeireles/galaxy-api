-- CreateTable
CREATE TABLE "Planet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "climate" TEXT NOT NULL,
    "terrain" TEXT NOT NULL,
    "population" TEXT NOT NULL,
    "starSystemId" INTEGER,
    CONSTRAINT "Planet_starSystemId_fkey" FOREIGN KEY ("starSystemId") REFERENCES "StarSystem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StarSystem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "affiliation" TEXT NOT NULL,
    "homeworldId" INTEGER NOT NULL,
    CONSTRAINT "Character_homeworldId_fkey" FOREIGN KEY ("homeworldId") REFERENCES "Planet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Spaceship" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "passengers" INTEGER NOT NULL
);
