import { Prisma, PrismaClient } from "../generated/prisma";
import { Request, Response } from "express";

const prisma = new PrismaClient(); // création d'une instance de PrismaClient

// Recupération de tous les pointVentes
export const getAllpointVente = async (req: Request, res: Response) => {
  try {
    const explotation = await prisma.pointVente.findMany();
    res.status(200).json(explotation);
  } catch (error) {
    console.error("Erreur interne du serveur", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Fonction pour récupérer une pointVente par son ID
export const getAllpointVenteById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10); // Récupération de l'ID depuis les paramètres de la requête

    const pointVente = await prisma.pointVente.findUnique({
      where: { id_pointVente: id },
    });

    // Vérification si l'pointVente existe
    if (!pointVente) {
      res.status(404).json({ message: "pointVente non trouvée" });
      return;
    }
    res.status(200).json(pointVente);
  } catch (error) {
    console.error("Erreur interne du serveur", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Fonction pour créer une nouvelle pointVente
export const createpointVente = async (req: Request, res: Response) => {
  try {
    const { nom, adresse, latitude, longitude, horaires, tel, description, is_active, id_utilisateur } = req.body;

    // Vérification des données requises
    if (!nom || !adresse || !latitude || !longitude || !is_active ) {
      res.status(400).json({ message: "Tous les champs sont requis" });
      return;
    }

    // Verification si l'ID de l'utilisateur existe
    const existeUtilisateur = await prisma.utilisateur.findUnique({
      where: { id_utilisateur: parseInt(id_utilisateur, 10) },
    });
    if (!existeUtilisateur) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    // Création de l'pointVente
    const pointVente = await prisma.pointVente.create({
      data: {
        nom: nom,
        adresse: adresse,
        latitude: latitude,
        longitude: longitude,
        horaires: horaires,
        tel: tel,
        description: description,
        is_active: is_active, // Par défaut, l'exploitation est active
        id_utilisateur: parseInt(id_utilisateur, 10),
      },
    });
    res
      .status(201)
      .json({ message: "pointVente ajouter avec succès", pointVente });
  } catch (error) {
    console.error("Erreur interne du serveur", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};


// Fonction pour mettre à jour une pointVente
export const updatepointVente = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { nom, adresse, latitude, longitude, horaires, tel, description, is_active, id_utilisateur } = req.body;

    // Vérification si l'pointVente existe}
    const existepointVente = await prisma.pointVente.findUnique({
      where: { id_pointVente: id },
    });
    if (!existepointVente) {
      res.status(404).json({ message: "pointVente non trouvée" });
      return;
    }

    // Preparation des données
    const donneeAChanger: Prisma.PointVenteUpdateInput = {};
    if (nom !== undefined) donneeAChanger.nom = nom;
    if (adresse !== undefined) donneeAChanger.adresse = adresse;
    if (latitude !== undefined) donneeAChanger.latitude = latitude;
    if (longitude !== undefined) donneeAChanger.longitude = longitude;
    if (horaires !== undefined) donneeAChanger.horaires = horaires;
    if (tel !== undefined) donneeAChanger.tel = tel;
    if (description !== undefined) donneeAChanger.description = description;
    if (is_active !== undefined) donneeAChanger.is_active = is_active;
    if (id_utilisateur !== undefined) donneeAChanger.utilisateur = {
            connect: { id_utilisateur: parseInt(id_utilisateur, 10) }
        };


    const pointVente = await prisma.pointVente.update({
        where: { id_pointVente: id },
        data: donneeAChanger,
    });
    res
      .status(200)
      .json({ message: "pointVente mise à jour avec succès", pointVente });
  } catch (error) {
    console.error("Erreur du serveur", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};


// Fonction pour supprimer une pointVente
export const deletepointVente = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    // Verification si l'pointVente existe
    const existepointVente = await prisma.pointVente.findUnique({
      where: { id_pointVente: id },
    });
    if (!existepointVente) {
      res.status(404).json({ message: "pointVente non trouvée" });
      return;
    }

    // Suppression de l'pointVente})
    const pointVente = await prisma.pointVente.delete({
      where: { id_pointVente: id },
    });
    res.status(200).json({ message: "pointVente supprimée avec succès" });
  } catch (error) {
    console.error("Erreur interne du serveur", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
};