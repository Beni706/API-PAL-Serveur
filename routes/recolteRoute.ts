import express, { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { getAllRecolte, getRecolteById, createRecolte, updateRecolte, deleteRecolte } from "../controllers/recolteController";

export const recolteRouter = express.Router(); // Création du Router

// Définition des routes
recolteRouter.get("/", authenticateToken, getAllRecolte); // Récupérer toutes les recoltes
recolteRouter.get("/:id", authenticateToken, getRecolteById); // Récupérer une recolte par son ID
recolteRouter.post("/", authenticateToken, createRecolte); // Ajouter une récolte
recolteRouter.put("/:id", authenticateToken, updateRecolte); // Modifier une recolte par son ID
recolteRouter.delete("/:id", authenticateToken, deleteRecolte) // Supprimer une recolte