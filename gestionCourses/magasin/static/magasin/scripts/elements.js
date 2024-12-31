// ETAGERES ET RAYONS
// Créer étagères et labels
const creerEtagere = (left, top, width, height, color, labelText, isVertical = false) => {
  console.log(`Création de l'étagère avec les paramètres: left=${left}, top=${top}, width=${width}, height=${height}, color=${color}, labelText=${labelText}, isVertical=${isVertical}`);

  // Création du rectangle (ou étagère)
  let etagere = new fabric.Rect({
    left: left,
    top: top,
    width: width,
    height: height,
    fill: color,
    stroke: 'black',
    strokeWidth: 2,
    selectable: true,
    hasControls: true,
  });
  console.log('Rectangle (étagère) créé:', etagere);

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
  console.log('Étiquette configurée:', label);

  // Créer un groupe contenant l'étagère et l'étiquette
  let groupe = new fabric.Group([etagere, label], {
    left: left,
    top: top
  });
  console.log('Groupe créé pour l\'étagère et l\'étiquette:', groupe);

  return groupe;
};

// Créer rayon et label
const creerRayon = (left, top, radius, color, labelText, rayonId) => {
  console.log(`Création du rayon avec les paramètres: left=${left}, top=${top}, radius=${radius}, color=${color}, labelText=${labelText}, rayonId=${rayonId}`);

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
    selectable: false,
    rayonId: rayonId // Ajouter l'identifiant de rayon
  });
  console.log('Cercle (rayon) créé:', rayon);

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
  console.log('Étiquette configurée:', label);

  // Créer un groupe contenant le rayon et l'étiquette
  let groupe = new fabric.Group([rayon, label], {
    left: left,
    top: top,
    selectable: false,
  });
  console.log('Groupe créé pour le rayon et l\'étiquette:', groupe);

  return groupe;
};

//----------------------------------------------------------
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
  { type: 'rectangle', left: 150, top: 600, width: 500, height: 50, color: 'lightcoral', label: 'Étagère 6A : ' },
  { type: 'rectangle', left: 150, top: 750, width: 500, height: 50, color: 'lightcoral', label: 'Étagère 6B : poissonnerie' },
  { type: 'rectangle', left: 150, top: 400, width: 500, height: 50, color: 'lightblue', label: 'Étagère 7A : ' },
  { type: 'rectangle', left: 150, top: 550, width: 500, height: 50, color: 'lightblue', label: 'Étagère 7B : ' },
  { type: 'rectangle', left: 150, top: 200, width: 500, height: 50, color: 'lightcoral', label: 'Étagère 8A : ' },
  { type: 'rectangle', left: 150, top: 350, width: 500, height: 50, color: 'lightcoral', label: 'Étagère 8B : ' },

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
  { type: 'circle', left: 75, top: 700, width: 50, height: 50, color: 'lightpink', label: '1d2' },
];

// Stocker les formes et leurs labels
let etagereRayonLabel = [];

// Créer les formes selon le type
const creerFormes = (type, left, top, width, height, color, labelText, isVertical = false) => {
  console.log(`Création de la forme: type=${type}, left=${left}, top=${top}, width=${width}, height=${height}, color=${color}, labelText=${labelText}, isVertical=${isVertical}`);

  if (type === 'rectangle') {
    return creerEtagere(left, top, width, height, color, labelText, isVertical);
  } else if (type === 'circle') {
    return creerRayon(left, top, width / 2, color, labelText); // Utilisation de width comme diamètre pour le cercle
  }
  console.warn('Type de forme non reconnu:', type);
  return null; // Retourner null si le type ne correspond pas
};

// Ajout des étagères, rayons et formes au canvas
dataEtagereRayon.forEach(data => {
  console.log('Traitement des données:', data);

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
    console.log('Forme ajoutée au canvas:', formeLabel);
  } else {
    console.warn('La forme n\'a pas pu être créée pour les données:', data);
  }
});
