import express, { Express } from 'express';
import cors from 'cors';

// Fonction pour configurer les middlewares de base sur l'application Express principale
export const configurationMiddleware = (app: Express) => {
    app.use(cors()); // Active CORS pour toutes les origines par défaut
    // On peut configurer CORS plus finement : app.use(cors({ origin: 'https://votre-domaine-frontend.com' }));

    app.use(express.json()); // Analyse les corps de requêtes JSON.
    app.use(express.urlencoded({ extended: true })); // Analyse les corps de requêtes URL-encodées.
};