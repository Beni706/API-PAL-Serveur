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
 *         dateRecolte:
 *           type: string
 *           format: date-time
 *           description: Date de la récolte
 *         montantTotal:
 *           type: integer
 *           description: Montant total du lot
 *         stock_initial:
 *           type: number
 *           format: float
 *           description: Stock initial
 *         stock_disponible:
 *           type: number
 *           format: float
 *           description: Stock disponible
 *     LotProduitRecolteInput:
 *       type: object
 *       properties:
 *         id_produit:
 *           type: integer
 *         id_recolte:
 *           type: integer
 *         dateRecolte:
 *           type: string
 *           format: date-time
 *         montantTotal:
 *           type: integer
 *         stock_initial:
 *           type: number
 *           format: float
 *         stock_disponible:
 *           type: number
 *           format: float
 *       required:
 *         - id_produit
 *         - id_recolte
 *         - dateRecolte
 *         - montantTotal
 *         - stock_initial
 *         - stock_disponible
 */

/**
 * @swagger
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
 */

/**
 * @swagger
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
 *         description: Lot de produit récolté non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /lotProduitRecoltes:
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
 *               $ref: '#/components/schemas/LotProduitRecolte'
 *       400:
 *         description: Champs requis manquants
 *       404:
 *         description: Produit ou Récolte non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /lotProduitRecoltes/{id}:
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
 *               $ref: '#/components/schemas/LotProduitRecolte'
 *       404:
 *         description: Lot de produit récolté non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /lotProduitRecoltes/{id}:
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
 *       404:
 *         description: Lot de produit récolté non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */

