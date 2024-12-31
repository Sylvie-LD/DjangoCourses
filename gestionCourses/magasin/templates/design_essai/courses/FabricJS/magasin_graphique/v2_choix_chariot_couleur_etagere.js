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

// //  LES CAISSES ---------------------------------------------------------------------------------
// // Fonction pour créer une caisse à partir d'une image
const createCaisse = (topPosition) => {
  // Charger l'image de la caisse
  return new Promise((resolve) => {
    fabric.Image.fromURL('caisse2.png', function(img) {
      img.set({
        left: 1300,   // Position X initiale
        top: topPosition, // Position Y initiale
        scaleX: 0.2,  // Échelle pour ajuster la taille de l'image
        scaleY: 0.2,  // Échelle pour ajuster la taille de l'image
        selectable: true,
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

      // Créer le texte associé à la caisse
      let caisseText = new fabric.Text('Caisse', {
        left: img.left + 25,
        top: img.top + 15,
        fontSize: 14,
        fill: 'white',
        selectable: false
      });

      // Ajouter le texte au canvas
      canvas.add(caisseText);
      
      // Résoudre la promesse avec l'image, la bordure, et le texte
      resolve({ caisse: img, border, caisseText });
    });
  });
};

// Position de base pour les caisses (à ajuster ici)
const initialTopPosition = 80; // Valeur pour ajuster la position verticale initiale

// Ajout des 5 caisses enregistreuses
let caisses = [];
let promises = [];
for (let i = 0; i < 5; i++) {
  promises.push(createCaisse(initialTopPosition + i * 150));
}

Promise.all(promises).then(results => {
  results.forEach(({ caisse, caisseText }) => {
    caisses.push({ caisse, caisseText });
  });
});

// Synchronisation du texte avec la caisse lors du déplacement
canvas.on('object:moving', function (event) {
  let obj = event.target;

  if (obj && obj.type === 'image') { // Les caisses sont maintenant des images
    let caisseObj = caisses.find(c => c.caisse === obj);
    if (caisseObj) {
      caisseObj.caisseText.set({
        left: obj.left + 10, // Mise à jour de la position horizontale du texte
        top: obj.top + 15   // Mise à jour de la position verticale du texte
      });
      canvas.renderAll(); // Re-render le canvas pour mettre à jour les positions
    }
  }
});

// Modifier l'image de la caisse
const imgAdded = (e) => {
  console.log(e)
  const inputElem = document.getElementById('myImg')
  const file = inputElem.files[0];
  reader.readAsDataURL(file)
}


//------------------------------------------------------------------------------------------------------

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

// Fonction pour afficher une liste de courses
const afficherListeCourses = (produits) => {
  const listeContainer = document.getElementById('listeCourses');
  listeContainer.innerHTML = '';  // Vider la liste existante

  produits.forEach(produit => {
    const item = document.createElement('li');
    item.textContent = produit;
    listeContainer.appendChild(item);
  });

  listeContainer.style.display = 'block';  // Afficher la liste
};


// Liste des produits dans le rayon 1
const produitsRayon1 = ['Eau', 'Coca', 'Jus d\'orange'];

// Identifier le Rayon 1 (assumant que c'est le premier cercle dans votre canvas)
let rayon1 = etagereRayonLabel.find(group => {
  return group.getObjects().some(obj => obj.text === '1');
});

if (rayon1) {
  // Ajouter un événement de clic sur le Rayon 1
  rayon1.on('mousedown', function() {
      // Afficher la liste des produits
      alert("Produits disponibles dans le Rayon 1 :\n- " + produitsRayon1.join("\n- "));
  });
}

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


// Créez un conteneur pour la liste des courses si ce n'est pas déjà fait
const listeContainer = document.createElement('ul');
listeContainer.id = 'listeCourses';
listeContainer.style.display = 'none';
listeContainer.style.position = 'absolute';
listeContainer.style.top = '10px';
listeContainer.style.left = '10px';
listeContainer.style.background = 'white';
listeContainer.style.padding = '10px';
listeContainer.style.border = '1px solid black';

document.body.appendChild(listeContainer);








//------------------
// Charger l'image du chariot
fabric.Image.fromURL('chariot.png', function(img) {
  img.set({
    left: 1060,    // Position X initiale
    top: 850,      // Position Y initiale
    scaleX: 0.1,   // Échelle pour ajuster la taille de l'image
    scaleY: 0.1,   // Échelle pour ajuster la taille de l'image
    selectable: true,
    hasControls: true
  });
 
  // Ajouter l'image du chariot au canvas
  canvas.add(img);

  avancerChariot(canvas,img) // img en parametre pour la rendre accessible
});

// -----------------------------------------------------------------------------------
// Fonction pour basculer entre les modes "avancer" et "couleur_etagere"
  
const bascule = (mode) => {
  const statusMessage = document.getElementById('statusMessage'); // Sélectionner l'élément pour afficher le message

  if (mode === modes.avancerChariot) {
      if (currentMode === modes.avancerChariot) {
          currentMode = '' // Désactive le mode "pan" si déjà activé
          console.log("Mode avancer desactivé")
          statusMessage.textContent = "Mode actuel : Aucun"; // Met à jour le message

      } else {
          currentMode = modes.avancerChariot // Active le mode "pan"
          console.log("Mode avancer activé")
          canvas.renderAll()
          statusMessage.textContent = "Mode actuel : Avancer le chariot"; // Met à jour le message
          canvas.renderAll()

      }
  } else if (mode === modes.couleur_etagere) {
      if (currentMode === modes.couleur_etagere) {  
          currentMode = '' // Désactive le mode dessin si déjà activé
          statusMessage.textContent = "Mode actuel : Aucun"; // Met à jour le message
          canvas.renderAll()
      } else {
          currentMode = modes.couleur_etagere // Active le mode dessin
          canvas.freeDrawingBrush.color = color // Assure que le pinceau utilise la couleur sélectionnée
          statusMessage.textContent = "Mode actuel : Modifier la couleur de l'étagère"; // Met à jour le message
          canvas.renderAll()   // Met à jour le canvas
      }      
  }
}

const avancerChariot =(canvas,img) => {  //img en parametre pour la rendre accessible
  // Ajouter un écouteur pour les clics sur le canvas
 
  canvas.on('mouse:down', function(event) {
    if (currentMode === modes.avancerChariot) {
   // Obtenir la position du clic
   const pointer = canvas.getPointer(event.e);
   const targetX = pointer.x - img.width * img.scaleX / 2; // Centrer sur le point cliqué
   const targetY = pointer.y - img.height * img.scaleY / 2; // Centrer sur le point cliqué
 
   // Animer le déplacement du chariot vers la position cliquée
   img.animate('left', targetX, {
    duration: 5000, // Durée de l'animation en millisecondes
     onChange: canvas.renderAll.bind(canvas) // Redessiner le canvas à chaque étape de l'animation
   });
 
   img.animate('top', targetY, {
    duration: 5000, // Durée de l'animation en millisecondes
     onChange: canvas.renderAll.bind(canvas) // Redessiner le canvas à chaque étape de l'animation
   });
  }
 });
 } 

// Changer la couleur des étagères
const setColorListener = () => {
  const picker = document.getElementById('colorPicker');
  picker.addEventListener('input', (event) => {
    if (currentMode === modes.couleur_etagere) {
      const selectedColor = event.target.value;
      const activeObject = canvas.getActiveObject();// Récupère l'objet actuellement sélectionné

      if (activeObject && activeObject.type === 'rect') {// Vérifie si l'objet sélectionné est un rectangle (étagère)
        activeObject.set('fill', selectedColor);// Change la couleur de remplissage de l'objet sélectionné
        canvas.renderAll();// Redessine le canvas pour appliquer les changements
      }
    }
  });
}

//-------------------------------------------------
//INITIALISATIOn
// canvas avec l'ID du canvas HTML
// const canvas = initCanvas('magasinCanvas');

// Image de fond
const bgUrl = 'background5.png';
setBackground(bgUrl, canvas)

// initialisation des modes
let mousePressed = false // variable pour suivre l'état de la souris

let currentMode='';
let color = '#000000';  // Couleur par défaut du pinceau

// Modes disponibles
  const modes = {
      avancerChariot: 'avancerChariot',
      couleur_etagere: 'couleur_etagere'
  }

// Activation des événements
setColorListener()  // Active l'écouteur pour le changement de couleur

// Gestion du téléchargement d'image
const reader = new FileReader()
const inputFile = document.getElementById('myImg');
inputFile.addEventListener('input', imgAdded)

reader.addEventListener("load", () => {
    fabric.Image.fromURL(reader.result, img => {
        canvas.add(img)
        canvas.requestRenderAll()
    })
})





//--------------------------------------------
// // Création du magasin (rectangle principal)
// const magasinRect = new fabric.Rect({
//   left: 0,
//   top: 0,
//   width: 1500,
//   height: 1000,
//   fill: 'lightgrey',
//   selectable: false
// });
// canvas.add(magasinRect);

// ---------------------------------------------------------------------------------------
// UTILITAIRES

// INFOS SUR LES OBJETS
//Afficher des informations dans une boîte modale lors du déplacement ou du redimensionnement des objets
const showModal = (text) => {
  document.getElementById('modal-content').innerText = text;
  document.getElementById('modal').style.display = 'block';
};

// Afficher les informations lors du déplacement des objets
canvas.on('object:moving', function(event) {
  let obj = event.target;
  if (obj && obj.type === 'rect') {
    // Obtenir les valeurs mises à jour
    let details = `Position: (${obj.left.toFixed(2)}, ${obj.top.toFixed(2)})\nSize: (${obj.width.toFixed(2)}, ${obj.height.toFixed(2)})`;
    showModal(details);
  }
});

// Afficher les informations lors du redimensionnement des objets
canvas.on('object:scaling', function(event) {
  let obj = event.target;
  if (obj && obj.type === 'rect') {
    // Afficher les dimensions pendant le redimensionnement
    let details = `Position: (${obj.left.toFixed(2)}, ${obj.top.toFixed(2)})\nSize en cours: (${(obj.width * obj.scaleX).toFixed(2)}, ${(obj.height * obj.scaleY).toFixed(2)})`;
    showModal(details);
  }
});

// Afficher les dimensions finales après le redimensionnement
canvas.on('object:scaled', function(event) {
  let obj = event.target;
  if (obj && obj.type === 'rect') {
    // Réinitialiser l'échelle
    obj.scaleX = 1;
    obj.scaleY = 1;
    obj.setCoords(); // Mettre à jour les coordonnées de l'objet
    canvas.renderAll(); // Re-render le canvas pour mettre à jour les positions

    // Obtenir les dimensions finales
    let details = `Position: (${obj.left.toFixed(2)}, ${obj.top.toFixed(2)})\nSize finale: (${obj.width.toFixed(2)}, ${obj.height.toFixed(2)})`;
    showModal(details);
  }
});

// Réinitialiser la boîte modale lors du clic en dehors
canvas.on('mouse:down', function(event) {
  if (!event.target) {
    document.getElementById('modal').style.display = 'none';
  }
});
//-------------------------------------
// // Fonction pour dessiner le quadrillage
// const drawGrid = (spacing) => {
//   const gridColor = 'green'; // Couleur des lignes du quadrillage
//   const width = canvas.getWidth();
//   const height = canvas.getHeight();

//   // Dessiner les lignes verticales
//   for (let x = spacing; x < width; x += spacing) {
//     const line = new fabric.Line([x, 0, x, height], {
//       stroke: gridColor,
//       selectable: false,
//       evented: false,
//       strokeWidth: 1
//     });
//     canvas.add(line);
//   }

//   // Dessiner les lignes horizontales
//   for (let y = spacing; y < height; y += spacing) {
//     const line = new fabric.Line([0, y, width, y], {
//       stroke: gridColor,
//       selectable: false,
//       evented: false,
//       strokeWidth: 1
//     });
//     canvas.add(line);
//   }
// };

// // Ajouter le quadrillage avec un espacement de 50 pixels
// drawGrid(50);