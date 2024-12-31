// Fonction pour rafraîchir les événements du calendrier
async function refreshCalendarEvents(calendar) {
    console.log('Début du rafraîchissement des événements du calendrier');
    try {
        const events = await loadAllEvents();
        console.log('Événements chargés:', events);
        calendar.removeAllEvents();
        console.log('Tous les événements supprimés du calendrier');
        calendar.addEventSource(events);
        console.log('Calendrier rafraîchi avec succès');
    } catch (error) {
        console.error('Erreur lors du rafraîchissement des événements du calendrier:', error);
    }
}

// Fonction pour charger les événements
async function loadAllEvents() {
    console.log('Début du chargement des événements');
    let events = [];
    let url = '/api/agenda/events/';

    try {
        while (url) {
            const response = await fetch(url);
            console.log('Réponse de l\'API pour les événements:', response);
            const data = await response.json();
            console.log('Données reçues:', data);

            if (data.results && Array.isArray(data.results)) {
                events = events.concat(data.results);
                url = data.next; // Passe à la page suivante
            } else {
                console.error('Structure des données inattendue:', data);
                break;
            }
        }

        console.log('Tous les événements chargés:', events);
        return events.map(event => ({
            id: event.id,
            title: event.title,
            start: event.start_date,
            end: event.end_date || null,
            allDay: event.all_day,
            backgroundColor: '#5bc0de',
            borderColor: 'black',
            textColor: 'black'
        }));
    } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
        return [];
    }
}

// Fonction pour mettre à jour un événement
async function updateEvent(event) {
    console.log('Début de la mise à jour de l\'événement:', event);

    try {
        if (!event.end_date) {
            console.log('end_date est null, on assigne la même valeur que start_date');
            event.end_date = event.start_date;
        }

        console.log('Événement après ajustement des dates:', event);

        const response = await fetch('/api/agenda/events/' + event.id + '/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(event)
        });
        console.log('Réponse du serveur:', response);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erreur serveur:', errorText);
            throw new Error(`Erreur lors de la mise à jour sur le serveur. Statut: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Réponse JSON du serveur:', responseData);
        console.log('Événement mis à jour sur le serveur');
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'événement:', error);
    }
}

// Fonction pour supprimer un événement
async function deleteEvent(eventId, calendar) {
    console.log('Début de la suppression de l\'événement avec ID:', eventId);

    try {
        await fetch('/api/agenda/events/' + eventId + '/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        });

        const event = calendar.getEventById(eventId);
        if (event) {
            event.remove();
            console.log('Événement supprimé du calendrier');
        } else {
            console.error('Événement non trouvé avec l\'ID:', eventId);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'événement:', error);
    }
}
