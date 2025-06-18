// swagger.ts
// Ce fichier configure Swagger pour documenter une API Express

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Définition des options Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API P.A.L",
      version: "1.0.0",
      description: "Documentation de l’API P.A.L avec Swagger",
    },
    servers: [
      {
        url: "http://localhost:8000/", // Modifiez si besoin
      },
    ],
  },
  // Chemin vers les fichiers contenant les annotations OpenAPI
  apis: [
    "./swagger/exploitation.ts", 
    "./swagger/recolte.ts", 
    "./swagger/utilisateur.ts", 
    "./swagger/produit.ts", 
    "./swagger/pointVente.ts", 
    "./swagger/lotProduitRecolte.ts"
  ],
};

// Génère la spécification Swagger à partir des options
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Fonction pour intégrer Swagger à l’application Express
export function setupSwagger(app: Express) {
  // Route pour accéder à la documentation Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
