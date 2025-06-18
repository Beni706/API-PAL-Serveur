import express, { Request, Response } from 'express';
// Importation des middlewares
import { configurationMiddleware } from './middleware/middleware';
// Importation des routes
import { utilisateurRouter } from './routes/utilisateurRoute';
import { exploitationRouter } from './routes/exploitationRoute';
import { produitRouter } from './routes/produitRoute';
import { recolteRouter } from './routes/recolteRoute';
import { pointVenteRouter } from './routes/pointVenteRoute';
import { lotProduitRecolteRouter } from './routes/lotProduitRecolteRoute';
import { setupSwagger } from './swagger';


const app = express()
const port = 8000;

// Configuration des middlewares
configurationMiddleware(app);

// Configuration de Swagger
setupSwagger(app)

// Route principale
app.get("/", (req: Request, res: Response) => {
    res.send("Ce-ci est l'Api de mon projet P.A.L!");
})

// Utilisation des routes
app.use("/utilisateurs", utilisateurRouter);
app.use("/exploitations", exploitationRouter);
app.use("/produits", produitRouter);
app.use("/recoltes", recolteRouter);
app.use("/pointVentes", pointVenteRouter);
app.use("/lotProduitRecoltes", lotProduitRecolteRouter);


app.listen(port, () => {
    console.log(`Serveur en écoute au http://localhost:${port}`);
});

