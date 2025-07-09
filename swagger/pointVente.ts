/**
 * @swagger
 * tags:
 *   name: PointVente
 *   description: Gestion des points de vente
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PointVente:
 *       type: object
 *       properties:
 *         id_pointVente:
 *           type: integer
 *           description: Identifiant du point de vente
 *         nom:
 *           type: string
 *           description: Nom du point de vente
 *         adresse:
 *           type: string
 *           description: Adresse du point de vente
 *         latitude:
 *           type: number
 *           description: Latitude du point de vente
 *         longitude:
 *           type: number
 *           description: Longitude du point de vente
 *         horaires:
 *           type: string
 *           description: Horaires d'ouverture
 *         tel:
 *           type: string
 *           description: Téléphone
 *         description:
 *           type: string
 *           description: Description
 *         is_active:
 *           type: boolean
 *           description: Statut d'activité
 *         id_utilisateur:
 *           type: integer
 *           description: Identifiant de l'utilisateur
 *       required:
 *         - nom
 *         - adresse
 *         - latitude
 *         - longitude
 *         - is_active
 *         - id_utilisateur
 *
 *     PointVenteInput:
 *       type: object
 *       properties:
 *         nom:
 *           type: string
 *         adresse:
 *           type: string
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 *         horaires:
 *           type: string
 *         tel:
 *           type: string
 *         description:
 *           type: string
 *         is_active:
 *           type: boolean
 *         id_utilisateur:
 *           type: integer
 *       required:
 *         - nom
 *         - adresse
 *         - latitude
 *         - longitude
 *         - is_active
 *         - id_utilisateur
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /pointVentes:
 *   get:
 *     summary: Récupère tous les points de vente
 *     tags:
 *       - PointVente
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des points de vente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PointVente'
 *       500:
 *         description: Erreur interne du serveur
 *   post:
 *     summary: Crée un nouveau point de vente
 *     tags:
 *       - PointVente
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PointVenteInput'
 *     responses:
 *       201:
 *         description: Point de vente ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 pointVente:
 *                   $ref: '#/components/schemas/PointVente'
 *       400:
 *         description: Tous les champs sont requis
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 *
 * /pointVentes/{id}:
 *   get:
 *     summary: Récupère un point de vente par ID
 *     tags:
 *       - PointVente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du point de vente
 *     responses:
 *       200:
 *         description: Point de vente trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PointVente'
 *       404:
 *         description: pointVente non trouvée
 *       500:
 *         description: Erreur interne du serveur
 *   put:
 *     summary: Met à jour un point de vente par ID
 *     tags:
 *       - PointVente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du point de vente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PointVenteInput'
 *     responses:
 *       200:
 *         description: Point de vente mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 pointVente:
 *                   $ref: '#/components/schemas/PointVente'
 *       404:
 *         description: pointVente non trouvée
 *       500:
 *         description: Erreur interne du serveur
 *   delete:
 *     summary: Supprime un point de vente par ID
 *     tags:
 *       - PointVente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du point de vente
 *     responses:
 *       200:
 *         description: Point de vente supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: pointVente non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
