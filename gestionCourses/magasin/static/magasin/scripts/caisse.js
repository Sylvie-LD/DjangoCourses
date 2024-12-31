// caisse.js
const createCaisse = (topPosition) => {
    console.log(`Création de la caisse à la position verticale: ${topPosition}`); // Affiche la position verticale pour chaque caisse

    return new Promise((resolve) => {
        fabric.Image.fromURL('/static/magasin/images/caisse2.png', function(img) {
            console.log('Image chargée:', img); // Affiche l'objet image après chargement

            img.set({
                left: 1300,
                top: topPosition,
                scaleX: 0.2,
                scaleY: 0.2,
                selectable: false,
                hasControls: true
            });
            console.log('Image configurée avec les propriétés suivantes:', img); // Affiche les propriétés de l'image après configuration

            canvas.add(img);
            console.log('Image ajoutée au canvas.');

            const border = new fabric.Rect({
                left: img.left - 2,
                top: img.top - 2,
                width: img.width * img.scaleX + 4,
                height: img.height * img.scaleY + 4,
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                selectable: false,
                evented: false
            });
            console.log('Bordure créée avec les propriétés suivantes:', border); // Affiche les propriétés de la bordure

            canvas.add(border);
            console.log('Bordure ajoutée au canvas.');

            canvas.sendToBack(border);
            console.log('Bordure envoyée en arrière-plan.');

            resolve({ caisse: img, border });
            console.log('Promise résolue avec l\'image de la caisse et la bordure.');
        }, (error) => {
            console.error('Erreur lors du chargement de l\'image:', error); // Affiche l'erreur si le chargement de l'image échoue
        });
    });
};

const initialTopPosition = 50;
console.log('Position initiale pour les caisses:', initialTopPosition); // Affiche la position initiale pour la première caisse
let caisses = [];
let promises = [];
for (let i = 0; i < 4; i++) {
    const topPosition = initialTopPosition + i * 200;
    console.log(`Ajout de la promesse pour la caisse ${i + 1} à la position verticale: ${topPosition}`); // Affiche la position verticale pour chaque caisse
    promises.push(createCaisse(topPosition));
}

Promise.all(promises).then(results => {
    caisses = results.map(result => result.caisse);
    console.log('Toutes les caisses ont été créées et ajoutées au tableau:', caisses); // Affiche le tableau des caisses après création
});
