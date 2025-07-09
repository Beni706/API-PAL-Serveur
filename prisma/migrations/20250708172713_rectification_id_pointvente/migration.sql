/*
  Warnings:

  - You are about to drop the column `nom_ferme` on the `exploitations` table. All the data in the column will be lost.
  - You are about to drop the column `id_point_vente` on the `lots_produit_recolte` table. All the data in the column will be lost.
  - Added the required column `nom` to the `exploitations` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_exploitations" (
    "id_exploitation" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "superficie" DECIMAL NOT NULL,
    "adresse" TEXT NOT NULL,
    "latitude" DECIMAL,
    "longitude" DECIMAL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "id_utilisateur" INTEGER NOT NULL,
    CONSTRAINT "exploitations_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "utilisateurs" ("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_exploitations" ("adresse", "description", "id_exploitation", "id_utilisateur", "is_active", "latitude", "longitude", "superficie") SELECT "adresse", "description", "id_exploitation", "id_utilisateur", "is_active", "latitude", "longitude", "superficie" FROM "exploitations";
DROP TABLE "exploitations";
ALTER TABLE "new_exploitations" RENAME TO "exploitations";
CREATE TABLE "new_lots_produit_recolte" (
    "id_produit_recolte" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_produit" INTEGER NOT NULL,
    "id_recolte" INTEGER NOT NULL,
    "id_pointVente" INTEGER,
    "date_recolte" DATETIME NOT NULL,
    "prix_unitaire" DECIMAL,
    "stock_initial" DECIMAL NOT NULL,
    "stock_disponible" DECIMAL NOT NULL,
    "date_peremption" DATETIME,
    "notes" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "lots_produit_recolte_id_produit_fkey" FOREIGN KEY ("id_produit") REFERENCES "produits" ("id_produit") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "lots_produit_recolte_id_recolte_fkey" FOREIGN KEY ("id_recolte") REFERENCES "recoltes" ("id_recolte") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "lots_produit_recolte_id_pointVente_fkey" FOREIGN KEY ("id_pointVente") REFERENCES "points_vente" ("id_pointVente") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_lots_produit_recolte" ("date_peremption", "date_recolte", "id_produit", "id_produit_recolte", "id_recolte", "is_active", "notes", "prix_unitaire", "stock_disponible", "stock_initial") SELECT "date_peremption", "date_recolte", "id_produit", "id_produit_recolte", "id_recolte", "is_active", "notes", "prix_unitaire", "stock_disponible", "stock_initial" FROM "lots_produit_recolte";
DROP TABLE "lots_produit_recolte";
ALTER TABLE "new_lots_produit_recolte" RENAME TO "lots_produit_recolte";
CREATE UNIQUE INDEX "lots_produit_recolte_id_produit_id_recolte_id_pointVente_key" ON "lots_produit_recolte"("id_produit", "id_recolte", "id_pointVente");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
