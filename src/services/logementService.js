const API_URL = 'http://localhost:8080/api';

/**
 * Récupère tous les logements depuis l'API.
 * @returns {Promise<Array<Object>>} Une promesse qui résout avec la liste des logements.
 * @throws {Error} Si la réponse du réseau n'est pas OK.
 */
export const getAllLogements = async () => {
  try {
    const response = await fetch(`${API_URL}/properties`);
    if (!response.ok) {
      // Gérer les erreurs HTTP (ex: 404, 500)
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`HTTP error ${response.status}: ${errorData.message || 'Erreur logements'}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur logements:', error);
    throw error;
  }
};

/**
 * Récupère un logement spécifique par son ID.
 * @param {string} id L'ID du logement à récupérer.
 * @returns {Promise<Object>} Une promesse qui résout avec les données du logement.
 * @throws {Error} Si la réponse du réseau n'est pas OK ou si le logement n'est pas trouvé.
 */
export const getLogementById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/properties/${id}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      if (response.status === 404) {
         throw new Error(`Logement non trouvé (404)`); // Erreur spécifique pour 404
      }
      throw new Error(`HTTP error ${response.status}: ${errorData.message || 'Failed to fetch logement'}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur logement:', error);
    throw error;
  }
};