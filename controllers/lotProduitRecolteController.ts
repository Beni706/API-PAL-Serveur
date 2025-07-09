import { Prisma, PrismaClient } from "../generated/prisma";
import { Request, Response } from "express";

const prisma = new PrismaClient(); // création d'une instance de PrismaClient

// Recupération de tous les lotProduitRecoltes
export const getAlllotProduitRecolte = async (req: Request, res: Response) => {
  try {
    const explotation = await prisma.lotProduitRecolte.findMany();
    res.status(200).json(explotation);
  } catch (error) {
    console.error("Erreur interne du serveur", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};


// Fonction pour récupérer une lotProduitRecolte par son ID
export const getAlllotProduitRecolteById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10); // Récupération de l'ID depuis les paramètres de la requête

    const lotProduitRecolte = await prisma.lotProduitRecolte.findUnique({
      where: { id_produit_recolte: id },
    });

    // Vérification si l'lotProduitRecolte existe
    if (!lotProduitRecolte) {
      res.status(404).json({ message: "lotProduitRecolte non trouvée" });
      return;
    }
    res.status(200).json(lotProduitRecolte);
  } catch (error) {
    console.error("Erreur interne du serveur", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};


// Fonction pour créer une nouvelle lotProduitRecolte
export const createlotProduitRecolte = async (req: Request, res: Response) => {
  try {
    const { 
      id_produit, 
      id_recolte, 
      id_pointVente, 
      date_recolte, 
      prix_unitaire, 
      stock_initial, 
      stock_disponible, 
      date_peremption, 
      notes, 
      is_active 
    } = req.body;

    // Vérification des données requises
    if (!id_produit || !id_recolte || !date_recolte  || !stock_initial || !stock_disponible || !is_active) {
      res.status(400).json({ message: "Tous les champs sont requis" });
      return;
    }

    // Verification si l'ID de l'utilisateur existe
    const existeProduit = await prisma.produit.findUnique({
      where: { id_produit: parseInt(id_produit, 10) },
    });
    if (!existeProduit) {
      res.status(404).json({ message: "Produit non trouvé" });
      return;
    }

    // Verification si l'ID de la recolte existe
    const existeRecolte = await prisma.recolte.findUnique({
      where: { id_recolte: parseInt(id_recolte, 10) },
    });
    if (!existeRecolte) {
      res.status(404).json({ message: "Recolte non trouvé" });
      return;
    }

    // Création de l'lotProduitRecolte
    const lotProduitRecolte = await prisma.lotProduitRecolte.create({
      data: {
        id_produit: parseInt(id_produit, 10), 
        id_recolte: parseInt(id_recolte, 10),
        id_pointVente: id_pointVente ? parseInt(id_pointVente, 10) : null, // Optionnel 
        date_recolte, 
        prix_unitaire: parseFloat(prix_unitaire), 
        stock_initial, 
        stock_disponible,
        date_peremption, 
        notes, 
        is_active
      },
    });
    res
      .status(201)
      .json({ message: "lotProduitRecolte ajouter avec succès", lotProduitRecolte });
  } catch (error) {
    console.error("Erreur interne du serveur", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};


// Fonction pour mettre à jour une lotProduitRecolte
export const updatelotProduitRecolte = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { 
      id_produit, 
      id_recolte, 
      id_pointVente, 
      date_recolte, 
      prix_unitaire, 
      stock_initial, 
      stock_disponible, 
      date_peremption, 
      notes, 
      is_active 
    } = req.body;

    // Vérification si l'lotProduitRecolte existe}
    const existelotProduitRecolte = await prisma.lotProduitRecolte.findUnique({
      where: { id_produit_recolte: id },
    });
    if (!existelotProduitRecolte) {
      res.status(404).json({ message: "lotProduitRecolte non trouvée" });
      return;
    }

    // Preparation des données
    const donneeAChanger: Prisma.LotProduitRecolteUpdateInput = {};
    if (id_produit !== undefined) donneeAChanger.produit = {
            connect: { id_produit: parseInt(id_produit, 10) }
        };
    if (id_recolte !== undefined) donneeAChanger.recolte = {
        connect: { id_recolte: parseInt(id_recolte, 10) }
       };
    if (id_pointVente !== undefined) donneeAChanger.pointVente = {
        connect: { id_pointVente: parseInt(id_pointVente, 10) }
       };
    if (date_recolte !== undefined) donneeAChanger.date_recolte = date_recolte;
    if (prix_unitaire !== undefined) donneeAChanger.prix_unitaire = parseFloat(prix_unitaire);
    if (stock_initial !== undefined) donneeAChanger.stock_initial = stock_initial;
    if (stock_disponible !== undefined) donneeAChanger.stock_disponible = stock_disponible;
    if (date_peremption !== undefined) donneeAChanger.date_peremption = date_peremption;
    if (notes !== undefined) donneeAChanger.notes = notes;
    if (is_active !== undefined) donneeAChanger.is_active = is_active;

    const lotProduitRecolte = await prisma.lotProduitRecolte.update({
        where: { id_produit_recolte: id },
        data: donneeAChanger,
    });
    res
      .status(200)
      .json({ message: "lotProduitRecolte mise à jour avec succès", lotProduitRecolte });
  } catch (error) {
    console.error("Erreur du serveur", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};


// Fonction pour supprimer une lotProduitRecolte
export const deletelotProduitRecolte = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    // Verification si l'lotProduitRecolte existe
    const existelotProduitRecolte = await prisma.lotProduitRecolte.findUnique({
      where: { id_produit_recolte: id },
    });
    if (!existelotProduitRecolte) {
      res.status(404).json({ message: "lotProduitRecolte non trouvée" });
      return;
    }

    // Suppression de l'lotProduitRecolte})
    const lotProduitRecolte = await prisma.lotProduitRecolte.delete({
      where: { id_produit_recolte: id },
    });
    res.status(200).json({ message: "lotProduitRecolte supprimée avec succès" });
  } catch (error) {
    console.error("Erreur interne du serveur", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
};