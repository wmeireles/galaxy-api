/*
  Warnings:

  - You are about to drop the column `passengers` on the `Spaceship` table. All the data in the column will be lost.
  - Added the required column `passengerCapacity` to the `Spaceship` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Spaceship" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "passengerCapacity" INTEGER NOT NULL
);
INSERT INTO "new_Spaceship" ("id", "manufacturer", "model", "name") SELECT "id", "manufacturer", "model", "name" FROM "Spaceship";
DROP TABLE "Spaceship";
ALTER TABLE "new_Spaceship" RENAME TO "Spaceship";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
