// Initialisation du canvas Fabric.js
const initCanvas = (id) => {
    return new fabric.Canvas(id, {
    width: 1500,
    height: 1000,
    selection: false
    
    
  });
  }
  
  // Créer le canvas avec l'ID du canvas HTML
  const canvas = initCanvas('magasinCanvas');
  
  // Fonction pour définir le fond avec redimensionnement
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
  
  // URL de l'image de fond
  const bgUrl = 'background5.png';
  
  setBackground(bgUrl, canvas)
  
  
  
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
  
  
  
  
  
  //  LES CAISSES 
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
  
  
  
  // Création des étagères et rayons
  const createEtagere = (left, top, width, height, color, labelText, isVertical = false) => {
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
  
  
     let labelOptions = {
      left: left + width / 2,   // Centrer horizontalement
      top: top + height / 2,    // Centrer verticalement
        fontSize: 14,
        fill: 'black',
        originX: 'center',
        originY: 'center',
        selectable: false,
        angle: isVertical ? -90 : 0 // Angle ajusté à -90 degrés pour corriger l'orientation
  
    };
  
    let label = new fabric.Text(labelText, labelOptions);
  
    return [etagere, label];
  };
  
  // Définition des données pour les étagères et rayons
  let rayonsData = [
    { left: 700, top: 0, width: 500, height: 50, color: 'lightcoral', label: 'Étagère 1A : boissons, conserves' },
    { left: 750, top: 150, width: 450, height: 50, color: 'lightcoral', label: 'Étagère 1B : huile, vinaigre, épices' },
    { left: 750, top: 200, width: 450, height: 50, color: 'lightblue', label: 'Étagère 2A : produits ménagers' },
    { left: 750, top: 350, width: 450, height: 50, color: 'lightblue', label: 'Étagère 2B : animalerie' },
    { left: 750, top: 400, width: 450, height: 50, color: 'lightgreen', label: 'Étagère 3A : petits déjeuners' },
    { left: 750, top: 550, width: 450, height: 50, color: 'lightgreen', label: 'Étagère 3B : gâteaux' },
    { left: 750, top: 600, width: 450, height: 50, color: 'lightyellow', label: 'Étagère 4A : alcools' },
    { left: 1000, top: 750, width: 200, height: 100, color: 'lightyellow', label: 'Étagère 4B : fruits et légumes' },
    { left: 50, top: 0, width: 200, height: 50, color: 'lightpink', label: 'Étagère 9A : surgelés de légumes' },
    { left: 250, top: 0, width: 200, height: 50, color: 'lightblue', label: 'Étagère 9A : surgelés de viande' },
    { left: 450, top: 0, width: 200, height: 50, color: 'lightpink', label: 'Étagère 9A : surgelés sucrés' },
    { left: 150, top: 150, width: 500, height: 50, color: 'lightblue', label: 'Étagère 9B : ' },
    { left: 150, top: 200, width: 500, height: 50, color: 'lightblue', label: 'Étagère 8A : ' },
  
    { left: 150, top: 350, width: 500, height: 50, color: 'lightblue', label: 'Étagère 8B : ' },
    { left: 150, top: 400, width: 500, height: 50, color: 'lightblue', label: 'Étagère 7A : ' },
  
    { left: 150, top: 550, width: 500, height: 50, color: 'lightblue', label: 'Étagère 7B : ' },
    { left: 150, top: 600, width: 500, height: 50, color: 'lightblue', label: 'Étagère 6A : ' },
  
  
  
    { left: 150, top: 750, width: 500, height: 50, color: 'lightblue', label: 'Étagère 6B : poissonnerie' },
    { left: 150, top: 800, width: 500, height: 50, color: 'lightgreen', label: 'Étagère 5A : boucherie' },
    { left: 750, top: 800, width: 150, height: 50, color: 'lightgreen', label: 'Étagère 5A : café' },
    { left: 750, top: 750, width: 150, height: 50, color: 'lightgreen', label: 'Étagère 4B : gateaux apéritifs' },
  
    { left: 600, top: 950, width: 400, height: 50, color: 'lightgreen', label: 'Étagère 5B : boulangerie' },
    { left: 300, top: 950, width: 300, height: 50, color: 'lightpink', label: 'Étagère 5B : charcuterie' },
    { left: 50, top: 950, width: 250, height: 50, color: 'lightblue', label: 'Étagère 5B : crémerie' },
  
  
  
    { left: 1000, top: 950, width: 250, height: 50, color: 'grey', label: 'Entrée' },
    { left: 1250, top: 950, width: 250, height: 50, color: 'lightblue', label: 'sortie' },
  
  
    // Étagères avec texte vertical
    { left: 0, top: 0, width: 50, height: 500, color: 'lightyellow', label: 'Étagère 10A : laitages', isVertical: true },
    { left: 0, top: 500, width: 50, height: 500, color: 'lightpink', label: 'Étagère 10A :fromagerie', isVertical: true }
  ];
  
  // Stocker les étagères et leurs labels
  let rayons = [];
  
  // Ajout des étagères et rayons au canvas
  rayonsData.forEach(data => {
    let [etagere, label] = createEtagere(data.left, data.top, data.width, data.height, data.color, data.label, data.isVertical);
    rayons.push({ etagere, label });
    canvas.add(etagere);
    canvas.add(label);
  });
  
  // Synchronisation du texte avec les étagères lors du déplacement
  canvas.on('object:moving', function (event) {
    let obj = event.target;
  
    if (obj && obj.type === 'rect' && obj.fill !== 'lightgrey') {
      let rayonObj = rayons.find(r => r.etagere === obj);
      if (rayonObj) {
        rayonObj.label.set({
          left: obj.left + 10, // Mise à jour de la position horizontale du texte
          top: obj.top + 20   // Mise à jour de la position verticale du texte
        });
        canvas.renderAll(); // Re-render le canvas pour mettre à jour les positions
      }
    }
  });
  
  
  
  
  
  
  
  // INFOS SUR LES OBJETS
  
  // Afficher des informations dans une boîte modale lors du déplacement ou du redimensionnement des objets
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
  
  
  
  
  
  // Exemple de chariot
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
  
    // Ajouter un écouteur pour les clics sur le canvas
    canvas.on('mouse:down', function(event) {
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
    });
  });
  
  
  
  
  
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
  
  
  
  
  const bascule = (mode) => {
    if (mode === modes.avancer) {
        if (currentMode === modes.avancer) {
            currentMode = ''
        } else {
            currentMode = modes.avancer
            canvas.isCouleur_etagereMode = false
            canvas.renderAll()
        }
    } else if (mode === modes.couleur_etagere) {
        if (currentMode === modes.couleur_etagere) {
            currentMode = ''
            canvas.isCouleur_etagereMode = false
            canvas.renderAll()
        } else {
            currentMode = modes.couleur_etagere
            canvas.isCouleur_etagereMode = true
            canvas.renderAll()
        }      
    }
  }
  
  
  // changer la couleur des étagères
  const setColorListener = () => {
    const picker = document.getElementById('colorPicker')
    picker.addEventListener('input', (event) => {
        const selectedColor = event.target.value;
        const activeObject = canvas.getActiveObject(); // Récupère l'objet actuellement sélectionné
    
        if (activeObject && activeObject.type === 'rect') { // Vérifie si l'objet sélectionné est un rectangle (étagère)
          activeObject.set('fill', selectedColor); // Change la couleur de remplissage de l'objet sélectionné
          canvas.renderAll(); // Redessine le canvas pour appliquer les changements
        }
      });
    };
  
    let currentMode;
  
    const modes = {
        avancer: 'avancer',
        couleur_etagere: 'couleur_etagere'
    }
    const reader = new FileReader()
  
  
  setColorListener()