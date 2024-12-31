// chariot.js
fabric.Image.fromURL('/static/magasin/images/chariot.png', function(img) {
    console.log('Image du chariot chargée:', img); // Affiche l'objet image du chariot après chargement

    img.set({
        left: 1060,
        top: 850,
        scaleX: 0.1,
        scaleY: 0.1,
        selectable: true,
        hasControls: true
    });
    console.log('Image du chariot configurée avec les propriétés suivantes:', img); // Affiche les propriétés de l'image après configuration

    canvas.add(img);
    console.log('Image du chariot ajoutée au canvas.');

    canvas.on('mouse:down', function(event) {
        const pointer = canvas.getPointer(event.e);
        console.log('Position du curseur lors du clic:', pointer); // Affiche la position du curseur sur le canvas lors du clic

        const targetX = pointer.x - img.width * img.scaleX / 2;
        const targetY = pointer.y - img.height * img.scaleY / 2;
        console.log(`Calcul des nouvelles positions - X: ${targetX}, Y: ${targetY}`); // Affiche les coordonnées cibles pour le déplacement de l'image

        img.animate('left', targetX, {
            duration: 1000,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: () => {
                console.log('Animation pour la position X terminée, début de l\'animation pour la position Y.');

                img.animate('top', targetY, {
                    duration: 1000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: () => {
                        console.log('Animation pour la position Y terminée.');

                        if (typeof window.produitsParRayon === 'undefined') {
                            console.error('La variable produitsParRayon n\'est pas définie.'); // Affiche une erreur si produitsParRayon n'est pas définie
                            return;
                        }

                        let message = '';
                        console.log('Début de la vérification des rayons et des étagères.');

                        for (let [rayonLabel, etageres] of Object.entries(window.produitsParRayon)) {
                            console.log(`Traitement du Rayon ${rayonLabel}.`);
                            for (let etagere of etageres) {
                                if (isChariotOnRayon(img, rayonLabel, etagere.id_etagere)) {
                                    let produitsTrouves = etagere.produits.map(produit => produit.nom_produit);
                                    if (produitsTrouves.length > 0) {
                                        message += `Produits à prendre dans le Rayon ${rayonLabel}, ${etagere.nom_etagere} :\n- ${produitsTrouves.join("\n- ")}\n\n`;
                                    } else {
                                        message += `Aucun produit trouvé dans l'Étagère ${etagere.nom_etagere} du Rayon ${rayonLabel}.\n\n`;
                                    }
                                }
                            }
                        }

                        if (message) {
                            console.log('Affichage des produits trouvés:', message); // Affiche le message contenant les produits trouvés
                            alert(message);
                        } else {
                            console.log('Aucun produit trouvé dans cette section.'); // Affiche un message si aucun produit n'est trouvé
                            alert('Pas de produits à prendre dans cette section.');
                        }
                    }
                });
            }
        });
    });
});

function isChariotOnRayon(img, rayonLabel) {
    console.log(`Vérification si le chariot est sur le rayon: ${rayonLabel}`); // Affiche le rayon qui est vérifié

    let rayon = etagereRayonLabel.find(group => {
        return group.getObjects().some(obj => obj.text === rayonLabel);
    });

    if (rayon) {
        const rayonBoundingRect = rayon.getBoundingRect();
        console.log('Bordure du rayon:', rayonBoundingRect); // Affiche les coordonnées et dimensions du rayon

        const chariotCenterX = img.left + (img.width * img.scaleX) / 2;
        const chariotCenterY = img.top + (img.height * img.scaleY) / 2;
        console.log(`Position centrale du chariot - X: ${chariotCenterX}, Y: ${chariotCenterY}`); // Affiche les coordonnées centrales du chariot

        const isOnRayon = (
            chariotCenterX >= rayonBoundingRect.left &&
            chariotCenterX <= rayonBoundingRect.left + rayonBoundingRect.width &&
            chariotCenterY >= rayonBoundingRect.top &&
            chariotCenterY <= rayonBoundingRect.top + rayonBoundingRect.height
        );

        console.log(`Le chariot est ${isOnRayon ? 'dans' : 'hors de'} la zone du rayon.`); // Affiche si le chariot est dans ou hors de la zone du rayon

        return isOnRayon;
    }

    console.log('Rayon non trouvé pour le label:', rayonLabel); // Affiche un message si le rayon n'est pas trouvé
    return false;
}
