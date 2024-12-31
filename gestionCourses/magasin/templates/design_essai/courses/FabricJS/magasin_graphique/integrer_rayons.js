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
    selectable: true
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
    top: top
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

// Synchronisation du texte avec les étagères lors du déplacement
canvas.on('object:moving', function (event) {
  let obj = event.target;

  if (obj && obj.type === 'group') {
    obj.getObjects().forEach(subObj => {
      if (subObj.type === 'textbox') {
        subObj.set({
          left: obj.left,
          top: obj.top
        });
      }
    });
    canvas.renderAll(); // Re-render le canvas pour mettre à jour les positions
  }
});


//-------------------------------------------------
//INITIALISATIOn
// canvas avec l'ID du canvas HTML
// const canvas = initCanvas('magasinCanvas');

// Activation des événements

// ---------------------------------------------------------------------------------------
// UTILITAIRES

// Fonction pour dessiner le quadrillage
const drawGrid = (spacing) => {
  const gridColor = 'green'; // Couleur des lignes du quadrillage
  const width = canvas.getWidth();
  const height = canvas.getHeight();

  // Dessiner les lignes verticales
  for (let x = spacing; x < width; x += spacing) {
    const line = new fabric.Line([x, 0, x, height], {
      stroke: gridColor,
      selectable: false,
      evented: false,
      strokeWidth: 1
    });
    canvas.add(line);
  }

  // Dessiner les lignes horizontales
  for (let y = spacing; y < height; y += spacing) {
    const line = new fabric.Line([0, y, width, y], {
      stroke: gridColor,
      selectable: false,
      evented: false,
      strokeWidth: 1
    });
    canvas.add(line);
  }
};

// Ajouter le quadrillage avec un espacement de 50 pixels
drawGrid(50);


// INFOS SUR LES OBJETS
// Fonction pour afficher les informations dans une boîte modale
const showModal = (text) => {
  document.getElementById('modal-content').innerText = text;
  document.getElementById('modal').style.display = 'block';
};

// Afficher les informations lors du déplacement des objets
canvas.on('object:moving', function(event) {
  let obj = event.target;

  // Calculer la taille en tenant compte de l'échelle
  let width = obj.width * obj.scaleX;
  let height = obj.height * obj.scaleY;

  // Obtenir les valeurs mises à jour
  let details = `Position: (${obj.left.toFixed(2)}, ${obj.top.toFixed(2)})\nSize: (${width.toFixed(2)}, ${height.toFixed(2)})`;
  showModal(details);
});

// Afficher les informations lors du redimensionnement des objets
canvas.on('object:scaling', function(event) {
  let obj = event.target;

  // Calculer la taille pendant le redimensionnement
  let width = obj.width * obj.scaleX;
  let height = obj.height * obj.scaleY;

  // Afficher les dimensions pendant le redimensionnement
  let details = `Position: (${obj.left.toFixed(2)}, ${obj.top.toFixed(2)})\nSize en cours: (${width.toFixed(2)}, ${height.toFixed(2)})`;
  showModal(details);
});

// Afficher les dimensions finales après le redimensionnement
canvas.on('object:scaled', function(event) {
  let obj = event.target;

  // Calculer la taille finale
  let width = obj.width * obj.scaleX;
  let height = obj.height * obj.scaleY;

  // Réinitialiser l'échelle
  obj.scaleX = 1;
  obj.scaleY = 1;
  obj.setCoords(); // Mettre à jour les coordonnées de l'objet
  canvas.renderAll(); // Re-render le canvas pour mettre à jour les positions

  // Obtenir les dimensions finales
  let details = `Position: (${obj.left.toFixed(2)}, ${obj.top.toFixed(2)})\nSize finale: (${width.toFixed(2)}, ${height.toFixed(2)})`;
  showModal(details);
});

// Réinitialiser la boîte modale lors du clic en dehors
canvas.on('mouse:down', function(event) {
  if (!event.target) {
    document.getElementById('modal').style.display = 'none';
  }
});
