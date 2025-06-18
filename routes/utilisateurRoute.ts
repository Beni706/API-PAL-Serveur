import express, { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { 
    getAllUtilisateurs, 
    getUtillisateurById, 
    createUtilisateur, 
    updateUtilisateur, 
    deleteUtilisateur, 
    loginUtilisateur, 
    getAllExploitationByUtilisateur,
    getAllPointVenteByUtilisateur 
} from "../controllers/utilisateurController"

export const utilisateurRouter = express.Router(); // Création du routeur

// Définition des routes
utilisateurRouter.get('/', authenticateToken, getAllUtilisateurs); // Route pour obtenir tous les utilisateurs

utilisateurRouter.get("/:id", authenticateToken, getUtillisateurById); // Route pour obtenir un utilisateur par ID

utilisateurRouter.get("/exploitation/:id", authenticateToken, getAllExploitationByUtilisateur) // Route pour obtenire les exploitation d'un utilisateur

utilisateurRouter.get("/pointVente/:id", authenticateToken, getAllPointVenteByUtilisateur) // Route pour obtenir les point de vente d'un utilisateur

utilisateurRouter.post("/", authenticateToken, createUtilisateur ); // Route pour créer un nouvel utilisateur

utilisateurRouter.put("/:id", authenticateToken, updateUtilisateur); // Route pour mettre à jour un utilisateur par ID

utilisateurRouter.delete("/:id", authenticateToken, deleteUtilisateur); // Route pour supprimer un utilisateur par ID

utilisateurRouter.post("/login", loginUtilisateur); // Route pour se connecter