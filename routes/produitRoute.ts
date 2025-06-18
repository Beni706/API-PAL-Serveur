import express, { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { getAllProduit, getProduitById, createProduit, updateProduit, deleteProduit } from "../controllers/produitController";

export const produitRouter = express.Router(); // Création du router

// Definition des route
produitRouter.get("/", authenticateToken, getAllProduit); // Route pour recuperer tous les produits
produitRouter.get("/:id", authenticateToken, getProduitById); // Route pour recuperer un produit par son ID
produitRouter.post("/", authenticateToken, createProduit); // Route pour créer un produit
produitRouter.put("/:id", authenticateToken, updateProduit); // Route pour modifier un produit
produitRouter.delete("/:id", authenticateToken, deleteProduit); // route pour supprimer un produit
