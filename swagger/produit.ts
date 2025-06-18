/**
 * @swagger
 * tags:
 *   name: Produits
 *   description: Gestion des produits
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Produit:
 *       type: object
 *       properties:
 *         id_produit:
 *           type: integer
 *           description: Identifiant du produit
 *         nom:
 *           type: string
 *           description: Nom du produit
 *         description:
 *           type: string
 *           description: Description du produit
 *         saison:
 *           type: string
 *           description: Saison du produit
 *         methodes:
 *           type: string
 *           description: Méthodes de production
 *     ProduitInput:
 *       type: object
 *       properties:
 *         nom:
 *           type: string
 *         description:
 *           type: string
 *         saison:
 *           type: string
 *         methodes:
 *           type: string
 *       required:
 *         - nom
 */


/**
 * @swagger
 * /produits:
 *   get:
 *     summary: Récupérer la liste de tous les produits
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produit'
 *       500:
 *         description: Erreur interne du serveur
 *   post:
 *     summary: Créer un nouveau produit
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProduitInput'
 *     responses:
 *       201:
 *         description: Produit ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produit'
 *       400:
 *         description: Champs requis manquants
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /produits/{id}:
 *   get:
 *     summary: Récupérer un produit par son ID
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Détail du produit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produit'
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur interne du serveur
 *   put:
 *     summary: Modifier un produit existant
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProduitInput'
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produit'
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur interne du serveur
 *   delete:
 *     summary: Supprimer un produit
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
