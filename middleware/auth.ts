import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'; // Importation des types Request, Response et NextFunction depuis express
import { ChargeUtilisateur } from 'typage/type';

import dotenv from 'dotenv';

dotenv.config(); // Chargement des variables d'environnement depuis le fichier .env

const JWT_SECRET = process.env.JWT_SECRET 

if (!JWT_SECRET) {
    console.error("Erreur critique: JWT_SECRET n'est pas défini dans les variables d'environnement.");
    process.exit(1); // Arrêter l'application si la clé secrète n'est pas définie
}

// Middleware pour l'authentification des tokens JWT
export const authenticateToken = (req: Request, res:Response, next: NextFunction): void => {
    // Récupération du token depuis les en-têtes de la requête
    const token = req.header('authorization')?.split(' ')[1]; // On suppose que le token est envoyé dans l'en-tête Authorization sous le format "Bearer <token>"

    // Vérification de la présence du token
    if (!token) {
        res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
        return; // Retourner une réponse 401 si le token est manquant
    };

    try {
        // Vérification le toeken et decoder
        const decoder =jwt.verify(token, JWT_SECRET as string) as ChargeUtilisateur;  // Utilisation de JWT_SECRET pour vérifier le token

        // Ajout de l'ID de l'utilisateur décodé à la requête pour une utilisation ultérieure
        req.utilisateur = decoder.id; 

        next(); // Appel de la fonction suivante dans la chaîne de middleware
    } catch (error) {
        console.error("Erreur lors de la vérification du token:", error);
        res.status(403).json({ message: 'Token invalide ou expiré.' }); // Réponse en cas de token invalide ou expiré
        return; // Retourner une réponse 403 si le token est invalide
    };
};