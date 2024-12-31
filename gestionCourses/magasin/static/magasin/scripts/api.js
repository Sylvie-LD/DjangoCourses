// api.js
// Récupération des données de l'API et gestion des rayons
axios.get('/magasin/api/rayons/')
    .then(response => {
        console.log('Réponse API reçue:', response); // Affiche l'ensemble de la réponse de l'API
        const rayons = response.data.results; // Initialisation de rayons avec les résultats de l'API
        console.log('Données API, voici les rayons :', rayons); // Affiche le tableau des rayons

        let produitsParRayon = {}; // Un objet vide produitsParRayon est initialisé pour organiser les produits par rayon.
        console.log('Initialisation de produitsParRayon:', produitsParRayon); // Affiche l'objet produitsParRayon avant le traitement

        rayons.forEach(rayon => { // forEach permet d'itérer sur chaque rayon
            const rayonId = rayon.id_rayon; // Récupère l'id du rayon
            console.log(`Traitement du Rayon ID: ${rayonId}`); // Affiche l'id du rayon en cours de traitement
            const etageres = rayon.etageres || []; // Récupère les étagères du rayon ou un tableau vide si aucune étagère
            console.log(`Nombre d'étagères dans le Rayon ${rayonId}: ${etageres.length}`); // Affiche le nombre d'étagères

            etageres.forEach(etagere => {
                console.log(`Traitement de l'Étagère ID: ${etagere.id_etagere}, Nom: ${etagere.nom_etagere}`); // Affiche les détails de l'étagère

                if (!produitsParRayon[rayonId]) { // Vérifie si le rayon n'est pas encore initialisé dans produitsParRayon
                    produitsParRayon[rayonId] = []; // Initialise le tableau pour ce rayon
                    console.log(`Initialisation du tableau pour le Rayon ID: ${rayonId}`); // Affiche que le tableau a été initialisé
                }

                produitsParRayon[rayonId].push({ // Ajoute l'étagère au tableau du rayon
                    id_etagere: etagere.id_etagere,
                    nom_etagere: etagere.nom_etagere,
                    produits: etagere.produits || [] // Récupère les produits ou un tableau vide s'il n'y a pas de produits
                });

                console.log(`Étagère ajoutée: ${etagere.nom_etagere} au Rayon ${rayonId}`); // Affiche les étagères ajoutées
            });
        });

        console.log('Structure finale de Produits par Rayon:', produitsParRayon); // Affiche la structure finale des produits par rayon
        window.produitsParRayon = produitsParRayon; // Expose produitsParRayon à l'objet global window
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des produits :", error); // Affiche l'erreur en cas de problème
    });
