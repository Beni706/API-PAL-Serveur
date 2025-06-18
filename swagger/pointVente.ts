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
 *           type: integer
 *           description: Téléphone
 *     PointVenteInput:
 *       type: object
 *       properties:
 *         nom:
 *           type: string
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 *         horaires:
 *           type: string
 *         tel:
 *           type: integer
 *       required:
 *         - nom
 *         - latitude
 *         - longitude
 */


/**
 * @swagger
 * components:
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
 *             type: object
 *             required:
 *               - nom
 *               - latitude
 *               - longitude
 *               - id_utilisateur
 *             properties:
 *               nom:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               horaires:
 *                 type: string
 *               tel:
 *                 type: string
 *               id_utilisateur:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Point de vente ajouté avec succès
 *       400:
 *         description: Tous les champs sont requis
 *       404:
 *         description: Utilisateur non trouvé
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
 *       404:
 *         description: Point de vente non trouvé
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
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               horaires:
 *                 type: string
 *               tel:
 *                 type: string
 *               id_utilisateur:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Point de vente mis à jour avec succès
 *       404:
 *         description: Point de vente non trouvé
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
 *       404:
 *         description: Point de vente non trouvé
 */
