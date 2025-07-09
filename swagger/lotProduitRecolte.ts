/**
 * @swagger
 * tags:
 *   name: LotProduitRecolte
 *   description: Gestion des lots de produits récoltés
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LotProduitRecolte:
 *       type: object
 *       properties:
 *         id_produit_recolte:
 *           type: integer
 *           description: Identifiant unique du lot produit récolte
 *         id_produit:
 *           type: integer
 *           description: Identifiant du produit
 *         id_recolte:
 *           type: integer
 *           description: Identifiant de la récolte
 *         id_pointVente:
 *           type: integer
 *           description: Identifiant du point de vente (optionnel)
 *         date_recolte:
 *           type: string
 *           format: date-time
 *           description: Date de la récolte
 *         prix_unitaire:
 *           type: number
 *           format: float
 *           description: Prix unitaire
 *         stock_initial:
 *           type: number
 *           format: float
 *           description: Stock initial
 *         stock_disponible:
 *           type: number
 *           format: float
 *           description: Stock disponible
 *         date_peremption:
 *           type: string
 *           format: date-time
 *           description: Date de péremption
 *         notes:
 *           type: string
 *           description: Notes
 *         is_active:
 *           type: boolean
 *           description: Statut d'activité
 *       required:
 *         - id_produit
 *         - id_recolte
 *         - date_recolte
 *         - stock_initial
 *         - stock_disponible
 *         - is_active
 *
 *     LotProduitRecolteInput:
 *       type: object
 *       properties:
 *         id_produit:
 *           type: integer
 *         id_recolte:
 *           type: integer
 *         id_pointVente:
 *           type: integer
 *         date_recolte:
 *           type: string
 *           format: date-time
 *         prix_unitaire:
 *           type: number
 *           format: float
 *         stock_initial:
 *           type: number
 *           format: float
 *         stock_disponible:
 *           type: number
 *           format: float
 *         date_peremption:
 *           type: string
 *           format: date-time
 *         notes:
 *           type: string
 *         is_active:
 *           type: boolean
 *       required:
 *         - id_produit
 *         - id_recolte
 *         - date_recolte
 *         - stock_initial
 *         - stock_disponible
 *         - is_active
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /lotProduitRecoltes:
 *   get:
 *     summary: Récupérer la liste de tous les lots de produits récoltés
 *     tags: [LotProduitRecolte]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des lots de produits récoltés
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LotProduitRecolte'
 *       500:
 *         description: Erreur interne du serveur
 *   post:
 *     summary: Créer un nouveau lot de produit récolté
 *     tags: [LotProduitRecolte]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LotProduitRecolteInput'
 *     responses:
 *       201:
 *         description: Lot de produit récolté ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 lotProduitRecolte:
 *                   $ref: '#/components/schemas/LotProduitRecolte'
 *       400:
 *         description: Tous les champs sont requis
 *       404:
 *         description: Produit ou Récolte non trouvé
 *       500:
 *         description: Erreur interne du serveur
 *
 * /lotProduitRecoltes/{id}:
 *   get:
 *     summary: Récupérer un lot de produit récolté par son ID
 *     tags: [LotProduitRecolte]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du lot de produit récolté
 *     responses:
 *       200:
 *         description: Détail du lot de produit récolté
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LotProduitRecolte'
 *       404:
 *         description: lotProduitRecolte non trouvée
 *       500:
 *         description: Erreur interne du serveur
 *   put:
 *     summary: Modifier un lot de produit récolté existant
 *     tags: [LotProduitRecolte]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du lot de produit récolté
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LotProduitRecolteInput'
 *     responses:
 *       200:
 *         description: Lot de produit récolté mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 lotProduitRecolte:
 *                   $ref: '#/components/schemas/LotProduitRecolte'
 *       404:
 *         description: lotProduitRecolte non trouvée
 *       500:
 *         description: Erreur interne du serveur
 *   delete:
 *     summary: Supprimer un lot de produit récolté
 *     tags: [LotProduitRecolte]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du lot de produit récolté
 *     responses:
 *       200:
 *         description: Lot de produit récolté supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: lotProduitRecolte non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

