import express, { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { getAllpointVente, getAllpointVenteById, createpointVente, updatepointVente, deletepointVente } from "../controllers/pointVenteController";

export const pointVenteRouter = express.Router(); // Création du routeur

// Définition des routes
pointVenteRouter.get('/', authenticateToken, getAllpointVente); // Route pour obtenir toutes les pointVentes
pointVenteRouter.get("/:id", authenticateToken, getAllpointVenteById); // Route pour obtenir une pointVente par ID 
pointVenteRouter.post("/", authenticateToken, createpointVente); // Route pour créer une nouvelle pointVente
pointVenteRouter.put("/:id", authenticateToken, updatepointVente); // Route pour mettre à jour une pointVente par ID
pointVenteRouter.delete("/:id", authenticateToken, deletepointVente); // Route pour supprimer une pointVente par ID