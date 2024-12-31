// background.js
// Fonction pour définir le fond avec redimensionnement
const setBackground = (url, canvas) => {
    console.log(`Début du chargement de l'image depuis l'URL: ${url}`); // Affiche l'URL de l'image à charger

    fabric.Image.fromURL(url, (img) => {
        console.log('Image chargée:', img); // Affiche l'objet image après chargement

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        console.log(`Dimensions de la toile - Largeur: ${canvas.width}, Hauteur: ${canvas.height}`); // Affiche les dimensions du canvas
        console.log(`Dimensions de l'image - Largeur: ${img.width}, Hauteur: ${img.height}`); // Affiche les dimensions de l'image
        console.log(`Échelles appliquées - scaleX: ${scaleX}, scaleY: ${scaleY}`); // Affiche les échelles calculées pour le redimensionnement

        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: scaleX,
            scaleY: scaleY,
            originX: 'left',
            originY: 'top'
        });

        console.log('Image de fond définie avec succès. La toile est redessinée.'); // Confirmation que l'image de fond a été définie
    }, (error) => {
        console.error('Erreur lors du chargement de l\'image:', error); // Affiche l'erreur si le chargement de l'image échoue
    });
};

// Initialisation du background
const bgUrl = '/static/magasin/images/background5.png';
console.log('URL de l\'image de fond:', bgUrl); // Affiche l'URL de l'image de fond avant l'appel de la fonction
setBackground(bgUrl, canvas);
