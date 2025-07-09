import bcrypt from "bcryptjs";
import { PrismaClient, Prisma } from "../generated/prisma";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient(); // création d'une instance de PrismaClient

// Fonction pour récupérer tous les utilisateurs
export const getAllUtilisateurs = async (req: Request, res: Response) => {
  try {
    const utilisateur = await prisma.utilisateur.findMany({
      select: {
        id_utilisateur: true,
        nom: true,
        prenom: true,
        email: true,
        tel: true,
        service: true,
        role: true,
        is_active: true,
      },
    });
    res.status(200).json(utilisateur);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

/* Cette fonction est asynchrone.Cela signifie qu'elle peut utiliser le mot-clé await
   à l'intérieur pour gérer des opérations qui prennent du temps (comme des appels à la base de données) sans bloquer le reste de l'application.
*/
// Fonction pour récupérer un utilisateur par son ID
export const getUtillisateurById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10); // Récupération de l'ID depuis les paramètres de la requête
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id_utilisateur: id },
      select: {
        id_utilisateur: true,
        nom: true,
        prenom: true,
        email: true,
        tel: true,
        service: true,
        role: true,
        is_active: true,
      },
    });
    // Vérification si l'utilisateur existe
    if (!utilisateur) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }
    res.status(200).json(utilisateur);
  } catch (error) {
    console.error("Erreur interne du serveur", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Fonction pour créer un nouvel utilisateur
export const createUtilisateur = async (req: Request, res: Response) => {
  try {
    // Récupération des données de l'utilisateur depuis le corps de la requête
    const { nom, prenom, email, password, tel, service, role, is_active } = req.body;

    // Verification des données requises
    if (!nom || !prenom || !email || !password || !role) {
      res.status(400).json({ message: "Tous les champs sont requis" });
      return;
    }

    // Vérification si l'utilisateur existe déjà
    const existeUtilisateur = await prisma.utilisateur.findUnique({
      where: { email: email },
    });
    if (existeUtilisateur) {
      res
        .status(409)
        .json({ message: "Un utilisateur avec cet email existe déjà" });
      return;
    }

    // Hachage du mot de passe
    const hacherPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur dans la base de données
    const nouvelUtilisateur = await prisma.utilisateur.create({
      data: {
        nom: nom,
        prenom: prenom,
        email: email,
        password: hacherPassword,
        tel: tel,
        service: service,
        role: role,
        is_active: is_active, // Par défaut, l'utilisateur est actif
      },
    });

    // génération du token
    const token = jwt.sign(
      { id: nouvelUtilisateur.id_utilisateur },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // Réponse avec le nouvel utilisateur et le token
    res
      .status(201)
      .json({
        message: "Utilisateur créé avec succès",
        utilisateur: nouvelUtilisateur,
        token: token,
      });
  } catch (error) {
    console.error("Erreur interne du serveur", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Fonction pour mettre à jour un utilisateur
export const updateUtilisateur = async (req: Request, res: Response) => {
  try {
    // Récupération de l'ID depuis les paramètres de la requête
    const id = parseInt(req.params.id, 10);
    // Récupération des données de l'utilisateur depuis le corps de la requête
    const { nom, prenom, email, password, tel, service, role, is_active } = req.body;

    // Vérification si l'utilisateur existe
    const existeUtilisateur = await prisma.utilisateur.findUnique({
      where: { id_utilisateur: id },
    });
    if (!existeUtilisateur) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    // Préparer les données pour la mise à jour en utilisant un type Prisma spécifique
    const donneeAChanger: Prisma.UtilisateurUpdateInput = {
      nom,
      prenom,
      email,
      tel,
      service,
      role,
      is_active,
    };

    // Hacher et ajouter le mot de passe seulement s'il est fourni
    if (password) {
      donneeAChanger.password = await bcrypt.hash(password, 10);
    }

    // Mise à jour de l'utilisateur dans la base de données
    const utilisateur = await prisma.utilisateur.update({
      where: { id_utilisateur: id },
      data: donneeAChanger,
    });
    res
      .status(200)
      .json({ message: "Utilisateur mis à jour avec succès", utilisateur });
  } catch (error) {
    console.error("Erreur interne du serveur", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Fonction pour supprimer un utilisateur
export const deleteUtilisateur = async (req: Request, res: Response) => {
  try {
    // Récupération de l'ID depuis les paramètres de la requête
    const id = parseInt(req.params.id, 10);

    // Vérification si l'utilisateur existe
    const existeUtilisateur = await prisma.utilisateur.findUnique({
      where: { id_utilisateur: id },
    });
    if (!existeUtilisateur) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    // Suppression de l'utilisateur
    const utilisateur = await prisma.utilisateur.delete({
      where: { id_utilisateur: id },
    });
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur interne du serveur", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Login utilisateur
export const loginUtilisateur = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Vérification des données requises
    if (!email || !password) {
      res.status(400).json({ message: "Email et mot de passe sont requis" });
      return;
    }

    // Recherche de l'utilisateur par email
    const existeUtilisateur = await prisma.utilisateur.findUnique({
      where: { email: email },
    });
    if (!existeUtilisateur) {
      res.status(404).json({ message: "Identification incorrecte !" });
      return;
    }

    // Vérification du mot de passe
    const passwordValide = await bcrypt.compare(
      password,
      existeUtilisateur.password
    );
    if (!passwordValide) {
      res.status(401).json({ message: "Identification incorrecte !" });
      return;
    }

    // Génération du token
    const token = jwt.sign(
      { id: existeUtilisateur.id_utilisateur },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
    // Exclure le mot de passe de l'objet utilisateur
    const { password: _password, ...userSansPassword } = existeUtilisateur;

    res.status(200).json({
      message: "Connexion réussie",
      token: token,
      user: userSansPassword, // <-- sans le password
    });
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Afficher les exploitation d'un utilisateur
export const getAllExploitationByUtilisateur = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id, 10);

    const exploitation = await prisma.exploitation.findMany({
      where: { id_utilisateur: id },
    });
    res.status(200).json(exploitation)
    
  } catch (error) {
    console.error("Erreur interne du serveur", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};


// Recuperer les point de vente d'un utilisateur
export const getAllPointVenteByUtilisateur = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    //Recuperer les point de vente
    const pointVente = await prisma.pointVente.findMany({
      where: { id_utilisateur: id },
    });
    res.status(200).json(pointVente);
    
  } catch (error) {
    console.error("Erreur interne du serveur", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  };
};