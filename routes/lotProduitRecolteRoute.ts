import express, { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { getAlllotProduitRecolte, getAlllotProduitRecolteById, createlotProduitRecolte, updatelotProduitRecolte, deletelotProduitRecolte } from "../controllers/lotProduitRecolteController";

export const lotProduitRecolteRouter = express.Router(); // Création du routeur

// Définition des routes
lotProduitRecolteRouter.get('/', authenticateToken, getAlllotProduitRecolte); // Route pour obtenir toutes les lotProduitRecoltes
lotProduitRecolteRouter.get("/:id", authenticateToken, getAlllotProduitRecolteById); // Route pour obtenir une lotProduitRecolte par ID 
lotProduitRecolteRouter.post("/", authenticateToken, createlotProduitRecolte); // Route pour créer une nouvelle lotProduitRecolte
lotProduitRecolteRouter.put("/:id", authenticateToken, updatelotProduitRecolte); // Route pour mettre à jour une lotProduitRecolte par ID
lotProduitRecolteRouter.delete("/:id", authenticateToken, deletelotProduitRecolte); // Route pour supprimer une lotProduitRecolte par ID