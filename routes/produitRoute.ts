import express, { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import {
  getAllProduit,
  getProduitById,
  createProduit,
  updateProduit,
  deleteProduit,
} from "../controllers/produitController";

export const produitRouter = express.Router(); // Création du router

// Definition des route
produitRouter.get("/", getAllProduit); // Route pour recuperer tous les produits
produitRouter.get("/:id", getProduitById); // Route pour recuperer un produit par son ID
produitRouter.post("/", authenticateToken, createProduit); // Route pour créer un produit avec upload d'image
produitRouter.put("/:id", authenticateToken, updateProduit); // Route pour modifier un produit
produitRouter.delete("/:id", authenticateToken, deleteProduit); // route pour supprimer un produit
