// Définir une interface pour la charge utile (ChargeUtilisateur) du JWT
export interface ChargeUtilisateur {
  id: number; // Ou string, selon le type de l'ID utilisateur dans votre base de données
  // Ajoutez d'autres propriétés que vous pourriez avoir dans votre token (ex: role)
}

// Étendre l'interface Request d'Express pour inclure la propriété utilisateur
declare global {
  namespace Express {
    interface Request {
      utilisateur?: number; // Ou juste `number` si vous ne stockez que l'ID
    }
  }
}