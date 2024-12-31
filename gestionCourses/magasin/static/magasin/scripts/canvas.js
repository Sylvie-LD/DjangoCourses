// canvas.js

// Fonction pour initialiser le canvas
const initCanvas = (id) => {
    console.log(`Initialisation du canvas avec l'ID: ${id}`); // Affiche l'ID du canvas que nous allons initialiser

    const canvasInstance = new fabric.Canvas(id, {
        width: 1500,
        height: 1000,
        selection: false
    });

    console.log('Canvas initialisé avec les paramètres suivants:', {
        width: 1500,
        height: 1000,
        selection: false
    }); // Affiche les paramètres utilisés pour initialiser le canvas

    return canvasInstance; // Retourne l'instance du canvas
}

// Appel de la fonction pour créer le canvas
const canvas = initCanvas('magasinCanvas');

console.log('Instance du canvas créée:', canvas); // Affiche l'instance du canvas après l'initialisation
