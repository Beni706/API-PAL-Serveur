/**
 * @swagger
 * tags:
 *   name: Recolte
 *   description: Gestion des récoltes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Recolte:
 *       type: object
 *       properties:
 *         id_recolte:
 *           type: integer
 *           description: Identifiant de la récolte
 *         statut:
 *           type: string
 *           description: Statut de la récolte
 *         quantite_recolte:
 *           type: number
 *           format: float
 *           description: Quantité récoltée
 *         date_debut:
 *           type: string
 *           format: date-time
 *           description: Date de début de la récolte
 *         date_fin:
 *           type: string
 *           format: date-time
 *           description: Date de fin de la récolte
 *         id_exploitation:
 *           type: integer
 *           description: Identifiant de l'exploitation
 *     RecolteInput:
 *       type: object
 *       properties:
 *         statut:
 *           type: string
 *         quantite_recolte:
 *           type: number
 *           format: float
 *         date_debut:
 *           type: string
 *           format: date-time
 *         date_fin:
 *           type: string
 *           format: date-time
 *         id_exploitation:
 *           type: integer
 *       required:
 *         - statut
 *         - quantite_recolte
 *         - id_exploitation
 */


/**
 * @swagger
 * /recoltes:
 *   get:
 *     summary: Récupérer la liste de toutes les récoltes
 *     tags: [Recolte]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des récoltes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recolte'
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /recoltes/{id}:
 *   get:
 *     summary: Récupérer une récolte par son ID
 *     tags: [Recolte]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la récolte
 *     responses:
 *       200:
 *         description: Détail de la récolte
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recolte'
 *       404:
 *         description: Récolte non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /recoltes:
 *   post:
 *     summary: Créer une nouvelle récolte
 *     tags: [Recolte]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecolteInput'
 *     responses:
 *       201:
 *         description: Récolte ajoutée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recolte'
 *       400:
 *         description: Champs requis manquants
 *       404:
 *         description: Exploitation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /recoltes/{id}:
 *   put:
 *     summary: Modifier une récolte existante
 *     tags: [Recolte]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la récolte
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecolteInput'
 *     responses:
 *       200:
 *         description: Récolte mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recolte'
 *       404:
 *         description: Récolte non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /recoltes/{id}:
 *   delete:
 *     summary: Supprimer une récolte
 *     tags: [Recolte]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la récolte
 *     responses:
 *       200:
 *         description: Récolte supprimée avec succès
 *       404:
 *         description: Récolte non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

