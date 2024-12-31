// Fonction pour initialiser le canvas
const initCanvas = (id) => {
  return new fabric.Canvas(id, {
    width: 1500,
    height: 1000,
    selection: false   
  });
}

// Appel de la fonction pour créer le canvas
const canvas = initCanvas('magasinCanvas');


// // Fonction pour définir le fond avec redimensionnement
const setBackground = (url, canvas) => {
  fabric.Image.fromURL(url, (img) => {
    // Calculer l'échelle pour ajuster l'image à la taille du canvas
    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;

    // Appliquer l'image de fond avec l'échelle calculée
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
      scaleX: scaleX,
      scaleY: scaleY,
      originX: 'left',
      originY: 'top'
    });
  });
};

//initialisation du background
const bgUrl = 'background5.png';
setBackground(bgUrl, canvas)

//------------------------------------------------------------------------------------------------------
// ETAGERES ET RAYONS
// Créer étagères et labels
const creerEtagere = (left, top, width, height, color, labelText, isVertical = false) => {
  // Création du rectangle (ou étagère)
  let etagere = new fabric.Rect({
    left: left,
    top: top,
    width: width,
    height: height,
    fill: color,
    stroke: 'black',      // Couleur de la bordure
    strokeWidth: 2,       // Épaisseur de la bordure
    selectable: true,
    hasControls: true
  });

  // Configuration de l'étiquette
  let label = new fabric.Text(labelText, {
    left: left + width / 2,
    top: top + height / 2,
    fontSize: 14,
    fill: 'black',
    originX: 'center',
    originY: 'center',
    selectable: false,
    angle: isVertical ? -90 : 0
  });

  // Créer un groupe contenant l'étagère et l'étiquette
  let groupe = new fabric.Group([etagere, label], {
    left: left,
    top: top
  });

  return groupe;
};

// Créer rayon et label
const creerRayon = (left, top, radius, color, labelText) => {
  // Création du cercle (ou rayon)
  let rayon = new fabric.Circle({
    left: left,
    top: top,
    radius: radius,
    fill: color,
    stroke: 'black',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center',
    selectable: false
  });

  // Configuration de l'étiquette
  let label = new fabric.Text(labelText, {
    left: left,
    top: top,
    fontSize: 14,
    fill: 'black',
    originX: 'center',
    originY: 'center',
    selectable: false,
    textAlign: 'center'
  });

  // Créer un groupe contenant le rayon et l'étiquette
  let groupe = new fabric.Group([rayon, label], {
    left: left,
    top: top,
    selectable :false,
  });

  return groupe;
};

// Définition des données pour les étagères et rayons
let dataEtagereRayon = [
  { type: 'rectangle', left: 650, top: 0, width: 550, height: 50, color: 'lightcoral', label: 'Étagère 1A : boissons, conserves' },
  { type: 'rectangle', left: 750, top: 150, width: 450, height: 50, color: 'lightcoral', label: 'Étagère 1B : huile, vinaigre, épices' },
  { type: 'rectangle', left: 750, top: 200, width: 450, height: 50, color: 'lightblue', label: 'Étagère 2A : produits ménagers' },
  { type: 'rectangle', left: 750, top: 350, width: 450, height: 50, color: 'lightblue', label: 'Étagère 2B : animalerie' },
  { type: 'rectangle', left: 750, top: 400, width: 450, height: 50, color: 'lightgreen', label: 'Étagère 3A : petits déjeuners' },
  { type: 'rectangle', left: 750, top: 550, width: 450, height: 50, color: 'lightgreen', label: 'Étagère 3B : gâteaux' },
  { type: 'rectangle', left: 750, top: 600, width: 450, height: 50, color: 'lightyellow', label: 'Étagère 4A : alcools' },
  { type: 'rectangle', left: 1000, top: 750, width: 200, height: 100, color: 'lightyellow', label: 'Étagère 4B : fruits et légumes' },
  { type: 'rectangle', left: 750, top: 750, width: 200, height: 50, color: 'lightgreen', label: 'Étagère 4B : gâteaux apéritifs' },
  { type: 'rectangle', left: 150, top: 800, width: 500, height: 50, color: 'lightgreen', label: 'Étagère 5A : boucherie' },
  { type: 'rectangle', left: 750, top: 800, width: 200, height: 50, color: 'lightgreen', label: 'Étagère 5A : café' },
  { type: 'rectangle', left: 600, top: 950, width: 400, height: 50, color: 'lightgreen', label: 'Étagère 5B : boulangerie' },
  { type: 'rectangle', left: 300, top: 950, width: 300, height: 50, color: 'lightpink', label: 'Étagère 5B : charcuterie' },
  { type: 'rectangle', left: 50, top: 950, width: 250, height: 50, color: 'lightblue', label: 'Étagère 5B : crémerie' },
  { type: 'rectangle', left: 150, top: 600, width: 500, height: 50, color: 'lightblue', label: 'Étagère 6A : ' },
  { type: 'rectangle', left: 150, top: 750, width: 500, height: 50, color: 'lightblue', label: 'Étagère 6B : poissonnerie' },
  { type: 'rectangle', left: 150, top: 400, width: 500, height: 50, color: 'lightblue', label: 'Étagère 7A : ' },
  { type: 'rectangle', left: 150, top: 550, width: 500, height: 50, color: 'lightblue', label: 'Étagère 7B : ' },
  { type: 'rectangle', left: 150, top: 200, width: 500, height: 50, color: 'lightblue', label: 'Étagère 8A : ' },
  { type: 'rectangle', left: 150, top: 350, width: 500, height: 50, color: 'lightblue', label: 'Étagère 8B : ' },

  { type: 'rectangle', left: 50, top: 0, width: 200, height: 50, color: 'lightpink', label: 'Étagère 9A : surgelés de légumes' },
  { type: 'rectangle', left: 250, top: 0, width: 200, height: 50, color: 'lightblue', label: 'Étagère 9A : surgelés de viande' },
  { type: 'rectangle', left: 450, top: 0, width: 200, height: 50, color: 'lightpink', label: 'Étagère 9A : surgelés sucrés' },
  { type: 'rectangle', left: 150, top: 150, width: 500, height: 50, color: 'lightblue', label: 'Étagère 9B : ' },

  { type: 'rectangle', left: 1000, top: 950, width: 250, height: 50, color: 'grey', label: 'Entrée' },
  { type: 'rectangle', left: 1250, top: 950, width: 250, height: 50, color: 'lightblue', label: 'Sortie' },

  // Étagères avec texte vertical
  { type: 'rectangle', left: 0, top: 0, width: 50, height: 500, color: 'lightyellow', label: 'Étagère 10A : laitages', isVertical: true },
  { type: 'rectangle', left: 0, top: 500, width: 50, height: 500, color: 'lightpink', label: 'Étagère 10A : fromagerie', isVertical: true },

  { type: 'circle', left: 950, top: 75, width: 50, height: 50, color: 'lightpink', label: '1' },
  { type: 'circle', left: 950, top: 275, width: 50, height: 50, color: 'lightpink', label: '2' },
  { type: 'circle', left: 950, top: 475, width: 50, height: 50, color: 'lightpink', label: '3' },
  { type: 'circle', left: 950, top: 675, width: 50, height: 50, color: 'lightpink', label: '4' },
  { type: 'circle', left: 820, top: 875, width: 50, height: 50, color: 'lightpink', label: '5' },


  { type: 'circle', left: 400, top: 875, width: 50, height: 50, color: 'lightpink', label: '6' },
  { type: 'circle', left: 400, top: 675, width: 50, height: 50, color: 'lightpink', label: '7' },
  { type: 'circle', left: 400, top: 475, width: 50, height: 50, color: 'lightpink', label: '8' },
  { type: 'circle', left: 400, top: 275, width: 50, height: 50, color: 'lightpink', label: '9' },
  { type: 'circle', left: 400, top: 75, width: 50, height: 50, color: 'lightpink', label: '10' },
  { type: 'circle', left: 75, top: 250, width: 50, height: 50, color: 'lightpink', label: '11' },
  { type: 'circle', left: 75, top: 700, width: 50, height: 50, color: 'lightpink', label: '12' },
];

// Stocker les formes et leurs labels
let etagereRayonLabel = [];

// Créer les formes selon le type
const creerFormes = (type, left, top, width, height, color, labelText, isVertical = false) => {
  if (type === 'rectangle') {
    return creerEtagere(left, top, width, height, color, labelText, isVertical);
  } else if (type === 'circle') {
    return creerRayon(left, top, width / 2, color, labelText); // Utilisation de width comme diamètre pour le cercle
  }
  return null; // Retourner null si le type ne correspond pas
};

// Ajout des étagères, rayons et formes au canvas
dataEtagereRayon.forEach(data => {
  let formeLabel = creerFormes(
    data.type,
    data.left,
    data.top,
    data.width,
    data.height || data.width, // Si la hauteur n'est pas spécifiée, utiliser la largeur
    data.color,
    data.label,
    data.isVertical
  );

  if (formeLabel) {
    etagereRayonLabel.push(formeLabel); // Ajouter le groupe au tableau
    canvas.add(formeLabel); // Ajouter le groupe au canvas
  }
});
//---------------------------------------------------------------------------------------------
// Charger et ajouter l'image du chariot
fabric.Image.fromURL('chariot.png', function(img) {
  img.set({
    left: 1060,    // Position X initiale du chariot
    top: 850,      // Position Y initiale du chariot
    scaleX: 0.1,   // Échelle horizontale de l'image du chariot
    scaleY: 0.1,   // Échelle verticale de l'image du chariot
    selectable: true,
    hasControls: true
  });
  
  // Ajouter le chariot au canvas
  canvas.add(img);

  // Ajouter un écouteur pour déplacer le chariot lorsque l'on clique sur le canvas
  canvas.on('mouse:down', function(event) {
    const pointer = canvas.getPointer(event.e);
    const targetX = pointer.x - img.width * img.scaleX / 2; // Centrer sur le clic
    const targetY = pointer.y - img.height * img.scaleY / 2; // Centrer sur le clic

    // Animer le déplacement horizontal
    img.animate('left', targetX, {
      duration: 2000,
      onChange: canvas.renderAll.bind(canvas),
      onComplete: () => {
        // Animer le déplacement vertical après le déplacement horizontal
        img.animate('top', targetY, {
          duration: 2000,
          onChange: canvas.renderAll.bind(canvas),
          onComplete: () => {
            // Vérifier la position du chariot par rapport aux rayons
            for (let [rayonLabel, produits] of Object.entries(produitsParRayon)) {
              if (isChariotOnRayon(img, rayonLabel)) {
                alert("Produits à prendre dans le Rayon " + rayonLabel + " :\n- " + produits.join("\n- "));
                break;
              }
            }
          }
        });
      }
    });
  });
});

// Fonction pour vérifier si le chariot est sur un rayon spécifique
function isChariotOnRayon(img, rayonLabel) {
  let rayon = etagereRayonLabel.find(group => {
    return group.getObjects().some(obj => obj.text === rayonLabel);
  });

  if (rayon) {
    const rayonBoundingRect = rayon.getBoundingRect();
    const chariotCenterX = img.left + (img.width * img.scaleX) / 2;
    const chariotCenterY = img.top + (img.height * img.scaleY) / 2;

    return (
      chariotCenterX >= rayonBoundingRect.left &&
      chariotCenterX <= rayonBoundingRect.left + rayonBoundingRect.width &&
      chariotCenterY >= rayonBoundingRect.top &&
      chariotCenterY <= rayonBoundingRect.top + rayonBoundingRect.height
    );
  }
  return false;
}

// Liste des produits à prendre dans les rayons
const produitsParRayon = {
  '1': ['Eau', 'Coca', 'Jus d\'orange'],
  '2': ['croquettes', 'javel', 'sopalin'],
  '3': ['céreales', 'brioches', 'pate à tartiner'],
  '6': ['beurre', 'crème fraiche', 'jambon'],
  '11': ['yaourts', 'crème dessert']
};


  // //  LES CAISSES ---------------------------------------------------------------------------------
  // Fonction pour créer une caisse à partir d'une image
  const createCaisse = (topPosition) => {
    // Charger l'image de la caisse
    return new Promise((resolve) => {
      fabric.Image.fromURL('caisse2.png', function(img) {
        img.set({
          left: 1300,   // Position X initiale
          top: topPosition, // Position Y initiale
          scaleX: 0.2,  // Échelle pour ajuster la taille de l'image
          scaleY: 0.2,  // Échelle pour ajuster la taille de l'image
          selectable: false,
          hasControls: true
                });
  
        // Ajouter l'image de la caisse au canvas
        canvas.add(img);
  
        // Créer la bordure autour de l'image
        const border = new fabric.Rect({
          left: img.left - 2, // Ajuster légèrement pour s'assurer que la bordure est visible autour de l'image
          top: img.top - 2,
          width: img.width * img.scaleX + 4, // Ajouter une petite marge pour la bordure
          height: img.height * img.scaleY + 4,
          fill: 'transparent', // La bordure ne doit pas couvrir l'image
          stroke: 'black',     // Couleur de la bordure
          strokeWidth: 2,      // Épaisseur de la bordure
          selectable: false,   // La bordure ne doit pas être sélectionnable
          evented: false       // La bordure ne doit pas interférer avec les événements
        });
  
        // Ajouter la bordure au canvas
        canvas.add(border);
        canvas.sendToBack(border); // Envoyer la bordure derrière l'image    
  
        // Résoudre la promesse avec l'image, la bordure
        resolve({ caisse: img, border });
      });
    });
  };
  
  // Position de base pour les caisses (à ajuster ici)
  const initialTopPosition = 50; // Valeur pour ajuster la position verticale initiale
  
  // Ajout des caisses
  let caisses = [];
  let promises = [];
  for (let i = 0; i < 4; i++) { // nb de caisses
    promises.push(createCaisse(initialTopPosition + i * 200)); //écart entre caisses
  }


