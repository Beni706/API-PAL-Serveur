/*
  Warnings:

  - You are about to drop the `Exploitation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LotProduitRecolte` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PointVente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Produit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recolte` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Utilisateur` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Exploitation";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LotProduitRecolte";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PointVente";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Produit";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Recolte";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Utilisateur";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "utilisateurs" (
    "id_utilisateur" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tel" TEXT,
    "service" TEXT,
    "role" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "exploitations" (
    "id_exploitation" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom_ferme" TEXT NOT NULL,
    "superficie" DECIMAL NOT NULL,
    "adresse" TEXT NOT NULL,
    "latitude" DECIMAL,
    "longitude" DECIMAL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "id_utilisateur" INTEGER NOT NULL,
    CONSTRAINT "exploitations_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "utilisateurs" ("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "produits" (
    "id_produit" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "categorie" TEXT NOT NULL,
    "unite" TEXT NOT NULL,
    "saison" TEXT,
    "methodes" TEXT,
    "image_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "recoltes" (
    "id_recolte" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "statut" TEXT NOT NULL,
    "quantite_recolte" DECIMAL NOT NULL,
    "date_debut" DATETIME,
    "date_fin" DATETIME,
    "notes" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "id_exploitation" INTEGER NOT NULL,
    CONSTRAINT "recoltes_id_exploitation_fkey" FOREIGN KEY ("id_exploitation") REFERENCES "exploitations" ("id_exploitation") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "points_vente" (
    "id_pointVente" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "horaires" TEXT,
    "tel" TEXT,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "id_utilisateur" INTEGER,
    CONSTRAINT "points_vente_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "utilisateurs" ("id_utilisateur") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "lots_produit_recolte" (
    "id_produit_recolte" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_produit" INTEGER NOT NULL,
    "id_recolte" INTEGER NOT NULL,
    "id_point_vente" INTEGER,
    "date_recolte" DATETIME NOT NULL,
    "prix_unitaire" DECIMAL,
    "stock_initial" DECIMAL NOT NULL,
    "stock_disponible" DECIMAL NOT NULL,
    "date_peremption" DATETIME,
    "notes" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "lots_produit_recolte_id_produit_fkey" FOREIGN KEY ("id_produit") REFERENCES "produits" ("id_produit") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "lots_produit_recolte_id_recolte_fkey" FOREIGN KEY ("id_recolte") REFERENCES "recoltes" ("id_recolte") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "lots_produit_recolte_id_point_vente_fkey" FOREIGN KEY ("id_point_vente") REFERENCES "points_vente" ("id_pointVente") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "utilisateurs_email_key" ON "utilisateurs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "lots_produit_recolte_id_produit_id_recolte_id_point_vente_key" ON "lots_produit_recolte"("id_produit", "id_recolte", "id_point_vente");
