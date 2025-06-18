-- CreateTable
CREATE TABLE "Utilisateur" (
    "id_utilisateur" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "service" TEXT,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Exploitation" (
    "id_exploitation" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "superficie" DECIMAL NOT NULL,
    "adresse" TEXT NOT NULL,
    "description" TEXT,
    "id_utilisateur" INTEGER NOT NULL,
    CONSTRAINT "Exploitation_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur" ("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Produit" (
    "id_produit" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "saison" TEXT,
    "methodes" TEXT
);

-- CreateTable
CREATE TABLE "Recolte" (
    "id_recolte" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "statut" TEXT NOT NULL,
    "quantite_recolte" DECIMAL NOT NULL,
    "date_debut" DATETIME,
    "date_fin" DATETIME,
    "id_exploitation" INTEGER NOT NULL,
    CONSTRAINT "Recolte_id_exploitation_fkey" FOREIGN KEY ("id_exploitation") REFERENCES "Exploitation" ("id_exploitation") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PointVente" (
    "id_pointVente" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "horaires" TEXT,
    "tel" INTEGER,
    "id_utilisateur" INTEGER NOT NULL,
    CONSTRAINT "PointVente_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur" ("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LotProduitRecolte" (
    "id_produit" INTEGER NOT NULL,
    "id_recolte" INTEGER NOT NULL,
    "id_produit_recolte" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateRecolte" DATETIME NOT NULL,
    "montantTotal" INTEGER NOT NULL,
    "stock_initial" DECIMAL NOT NULL,
    "stock_disponible" DECIMAL NOT NULL,
    CONSTRAINT "LotProduitRecolte_id_produit_fkey" FOREIGN KEY ("id_produit") REFERENCES "Produit" ("id_produit") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LotProduitRecolte_id_recolte_fkey" FOREIGN KEY ("id_recolte") REFERENCES "Recolte" ("id_recolte") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");
