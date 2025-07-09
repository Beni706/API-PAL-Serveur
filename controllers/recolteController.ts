import { Prisma, PrismaClient } from "../generated/prisma";
import { Request, Response } from "express";

const prisma = new PrismaClient(); // Création d'une instance de PrismaClient

// Fonction pour récupérer toutes les recolte
export const getAllRecolte = async (req: Request, res: Response) => {
    try {
        const recolte = await prisma.recolte.findMany();
        res.json(recolte);
    } catch (error) {
        console.error("Erreur interne du server", error);
        res.status(500).json({ error: "Erreur interne du server" });
    };
};


// Fonction pour récupérer une recolte par son ID
export const getRecolteById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id); // Recupérer l'ID depuis les parametre de la requête

        const recolte = await prisma.recolte.findUnique({
            where: { id_recolte: id },
        });

       // Verification si la recolte existe
       if(!recolte) {
        res.status(404).json({ error: "Recolte non trouvée" });
        return ;
       }

        res.status(200).json(recolte);

    } catch (error) {
        console.error("Erreur interne du server", error);
        res.status(500).json({ error: "Erreur interne du server" });
    };
};

// Fonction pour créer une nouvelle recolte
export const createRecolte = async (req: Request, res: Response) => {
    try {
        const {statut, quantite_recolte, date_debut, date_fin, notes, is_active, id_exploitation } = req.body;

        // Verification des champs
        if (!statut || !quantite_recolte || !is_active|| !id_exploitation) {
            res.status(400).json({ error: "Tous les champs sont obligatoires" });
            return;
        }

        // Verification si l'exploitation existe
        const exploitation = await prisma.exploitation.findUnique({
            where: { id_exploitation: id_exploitation },
        });
        if (!exploitation) {
            res.status(404).json({ error: "Exploitation non trouvée" });
            return;
        }

        // Création de la recolte
        const recolte = await prisma.recolte.create({
            data: {
                statut,
                quantite_recolte,
                date_debut,
                date_fin,
                notes,
                is_active,
                id_exploitation: parseInt(id_exploitation),
            },
        });

        res.status(201).json({ message: "Recolte créée avec succès", recolte});

    } catch (error) {
        console.error("Erreur interne du server", error);
        res.status(500).json({ error: "Erreur interne du server" });
    };
};


// Fonction pour modifier une recolte
export const updateRecolte = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10); // Recupérer l'ID sur les parametre de la requête
        const {statut, quantite_recolte, date_debut, date_fin, notes, is_active, id_exploitation } = req.body;

        // Verification si la recolte existe
        const existeRecolte = await prisma.recolte.findUnique({
            where: { id_recolte: id },
        });
        if (!existeRecolte) {
            res.status(404).json({ error: "Recolte non trouvée" });
            return;
        }

        // Preparation des données
        const donneeAChanger: Prisma.RecolteUpdateInput = {};
            if(statut !== undefined) donneeAChanger.statut = statut;
            if(quantite_recolte !== undefined) donneeAChanger.quantite_recolte = quantite_recolte;
            if(date_debut !== undefined) donneeAChanger.date_debut = date_debut;
            if(date_fin !== undefined) donneeAChanger.date_fin = date_fin;
            if(notes !== undefined) donneeAChanger.notes = notes;
            if(is_active !== undefined) donneeAChanger.is_active = is_active;
            // Si l'ID de l'exploitation est fourni, on le connecte
            // Sinon, on ne le modifie pas
            if(id_exploitation !== undefined) donneeAChanger.exploitation = {
                connect: { id_exploitation: parseInt(id_exploitation) },
            };
            
            // Mise à jour de la recolte
            const recolte = await prisma.recolte.update({
                where: { id_recolte: id },
                data: donneeAChanger,
            });
            res.status(200).json({ message: "Recolte mise à jour avec succès", recolte });

    } catch (error) {
        console.error("Erreur interne du server", error);
        res.status(500).json({ error: "Erreur interne du server" });
    };
};


// Fonction pour supprimer une recolte
export const deleteRecolte = async (req: Request, res: Response) => {
    try {
       const id = parseInt(req.params.id, 10); // Recupérer l'ID sur les parametre de la requête

       // Verification si la recolte existe
       const existeRecolte = await prisma.recolte.findUnique({
        where: { id_recolte: id },
       });
       if (!existeRecolte) {
          res.status(404).json({ error: "Recolte non trouvée" });
          return;
       }

       // Supprimer la recolte
       const recolte = await prisma.recolte.delete({
        where: { id_recolte: id },
       });
       res.status(200).json({ message: "Recolte supprimée avec succès" });
 
    } catch (error) {
        console.error("Erreur interne du server", error);
        res.status(500).json({ error: "Erreur interne du server" });
    };
};