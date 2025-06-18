import { PrismaClient } from "../generated/prisma";
import { Request, Response } from "express";

const prisma = new PrismaClient(); // Creation d'une instanse de PrismaClient

// Recuperation de tous les produits
export const getAllProduit = async (req: Request, res: Response) => {
  try {
    const produit = await prisma.produit.findMany();
    res.status(200).json(produit);
  } catch (error) {
    console.error("Erreur interne du serveur", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Recuperer un produits par son ID
export const getProduitById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    const existeProduit = await prisma.produit.findUnique({
      where: { id_produit: id },
    });

    // Verifier si le produit existe
    if (!existeProduit) {
      res.status(404).json({ message: "Produits non trouvé" });
      return;
    }
  } catch (error) {
    console.error("Erreur interne du serveur", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

//Fonction pour créer un produit
export const createProduit = async (req: Request, res: Response) => {
  try {
    const { nom, description, saison, methodes } = req.body;

    // Verification des champs
    if (!nom) {
      res.status(400).json({ message: "Tous les champs sont requis" });
      return;
    }

    // création du produit
    const produit = await prisma.produit.create({
      data: {
        nom,
        description,
        saison,
        methodes,
      },
    });
    res.status(201).json({ Message: "Produit ajouter avec succès", produit });
  } catch (error) {
    console.error("Erreur interne du server", error);
    res.status(500).json({ message: " Erreur interne du server" });
  }
};

// Modifier un produit
export const updateProduit = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { nom, description, saison, methodes } = req.body;

    // Verification si le produit existe
    const existeProduit = await prisma.produit.findUnique({
      where: { id_produit: id },
    });
    if (!existeProduit) {
      res.status(404).json({ message: "Produit non trouvé" });
      return;
    }

    const produit = await prisma.produit.update({
      where: { id_produit: id },
      data: {
        nom,
        description,
        saison,
        methodes,
      },
    });
    res
      .status(200)
      .json({ message: "Produit mise à jour avec succès", produit });
  } catch (error) {
    console.error("Erreur interne du server", error);
    res.status(500).json({ message: "Erreur interne du server" });
  }
};

// Supprimer un Produit
export const deleteProduit = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    // Verification si le produit existe
    const existeProduit = await prisma.produit.findUnique({
      where: { id_produit: id },
    });
    if (!existeProduit) {
      res.status(404).json({ message: "Produit non trouvé" });
      return;
    }

    const produit = await prisma.produit.delete({
      where: { id_produit: id },
    });
    res.status(200).json({ Message: "Produit supprimer avec succès " });
  } catch (error) {
    console.error("Erreur interne du server", error);
    res.status(500).json({ message: "Erreur interne du server" });
  }
};
