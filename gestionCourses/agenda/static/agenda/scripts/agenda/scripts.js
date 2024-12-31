// Définition de toutes les fonctions avant leur utilisation

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

// Fonction pour ouvrir le modal
function openModal(start, end, eventId = null, eventTitle = '', isAllDay = false) {
    console.log('Ouverture du modal avec:', { start, end, eventId, eventTitle, isAllDay });

    const modal = document.getElementById('myModal');
    if (!modal) {
        console.error('Modal avec ID "myModal" introuvable.');
        return;
    }

    modal.classList.add('is-active');

    const startDateInput = document.getElementById('modal-start_date');
    const endDateInput = document.getElementById('modal-end_date');
    const titleInput = document.getElementById('modal-title');
    const allDayCheckbox = document.getElementById('modal-all-day');
    const hiddenIdInput = document.getElementById('modal-event-id');
    const deleteButton = document.getElementById('modal-delete');

    if (!startDateInput || !endDateInput || !titleInput || !hiddenIdInput || !deleteButton) {
        console.error('Champs du modal introuvables.');
        return;
    }

    const startOfDay = new Date(start);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);

    startDateInput.value = formatDateForInput(startOfDay);
    endDateInput.value = formatDateForInput(endOfDay);

    titleInput.value = eventTitle;
    hiddenIdInput.value = eventId;
    allDayCheckbox.checked = isAllDay;
    deleteButton.classList.toggle('is-hidden', !eventId);

    console.log('Date de début ajustée:', startDateInput.value);
    console.log('Date de fin ajustée:', endDateInput.value);
    console.log('Titre de l\'événement:', titleInput.value);
    console.log('Toute la journée:', allDayCheckbox.checked);

    document.getElementById('modal-error-message').classList.add('is-hidden');
    document.getElementById('modal-error-message').textContent = '';
}

// Fonction pour initialiser le modal
function initializeModal(calendar) {
    console.log('Initialisation du modal');

    const form = document.getElementById('modal-event-form');
    if (!form) {
        console.error('Formulaire du modal introuvable.');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('modal-title').value;
        const startDate = document.getElementById('modal-start_date').value;
        const endDate = document.getElementById('modal-end_date').value;
        const allDay = document.getElementById('modal-all-day').checked;
        const eventId = document.getElementById('modal-event-id').value;

        console.log('Soumission du formulaire:', { title, startDate, endDate, allDay, eventId });

        if (!title || !startDate) {
            const errorMessage = document.getElementById('modal-error-message');
            if (errorMessage) {
                errorMessage.classList.remove('is-hidden');
                errorMessage.textContent = 'Veuillez remplir tous les champs.';
            }
            return;
        }

        let start = new Date(startDate);
        let end = allDay ? new Date(startDate) : new Date(endDate);

        if (allDay) {
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
        } else {
            if (isNaN(end.getTime())) {
                console.error('Date de fin invalide:', endDate);
                return;
            }
        }

        const startISO = start.toISOString();
        const endISO = end.toISOString();

        console.log('Date de début traitée:', startISO);
        console.log('Date de fin traitée:', endISO);

        const method = eventId ? 'PUT' : 'POST';
        const url = eventId ? `/api/agenda/events/${eventId}/` : '/api/agenda/events/';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ title, start_date: startISO, end_date: endISO, all_day: allDay })
        })
        .then(response => {
            console.log('Réponse de l\'API:', response);
            return response.json();
        })
        .then(data => {
            console.log('Réponse JSON de l\'API:', data);

            if (eventId) {
                const event = calendar.getEventById(eventId);
                if (event) {
                    event.setProp('title', title);
                    event.setStart(startISO);
                    event.setEnd(endISO);
                    event.setAllDay(allDay);
                }
            } else {
                calendar.addEvent({
                    id: data.id,
                    title: data.title,
                    start: data.start_date,
                    end: data.end_date,
                    allDay: allDay
                });
            }
            document.getElementById('myModal').classList.remove('is-active');
            form.reset();
            document.getElementById('modal-error-message').classList.add('is-hidden');
            refreshCalendarEvents(calendar);
        })
        .catch(error => {
            console.error('Erreur lors de la soumission du formulaire:', error);
        });
    });

    document.getElementById('modal-delete').addEventListener('click', function() {
        const eventId = document.getElementById('modal-event-id').value;
        if (eventId) {
            console.log('Suppression de l\'événement avec ID:', eventId);
            deleteEvent(eventId, calendar);
            document.getElementById('myModal').classList.remove('is-active');
            document.getElementById('modal-event-form').reset();
        }
    });

    const closeModalButtons = document.querySelectorAll('#modal-close, .modal-background');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Fermeture du modal');
            document.getElementById('myModal').classList.remove('is-active');
        });
    });
}

// Fonction pour formater la date pour datetime-local
function formatDateForInput(date) {
    if (!(date instanceof Date)) {
        console.error('Date invalide pour formatDateForInput:', date);
        return '';
    }
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    console.log('Date formatée pour input:', formattedDate);
    return formattedDate;
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

// Fonction pour obtenir un cookie par nom
function getCookie(name) {
    console.log('Recherche du cookie:', name);

    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                console.log('Cookie trouvé:', cookieValue);
                break;
            }
        }
    }
    return cookieValue;
}

// Code principal
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Chargement du DOM complet');

    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) {
        console.error('Élément du calendrier introuvable');
        return;
    }

    const calendar = new FullCalendar.Calendar(calendarEl, {
        slotMinTime: '08:00',
        slotMaxTime: '20:00',
        expandRows: true,
        timeZone: 'local',
        locale: 'fr',
        initialView: 'dayGridMonth',
        selectable: true,
        editable: true,
        firstDay: 1,
        headerToolbar: {
            left: 'prevYear,prev,next,nextYear today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        buttonText: {
            today: 'Aujourd\'hui',
            month: 'Mois',
            week: 'Semaine',
            day: 'Jour',
            list: 'Liste'
        },
        dayHeaderFormat: { weekday: 'long' },
        allDaySlot: true,
        allDayContent: function() {
            return { html: '<div>Toute la journée</div>' };
        },
        events: async function(fetchInfo, successCallback, failureCallback) {
            console.log('Chargement des événements via FullCalendar');
            try {
                const events = await loadAllEvents();
                console.log('Événements chargés pour FullCalendar:', events);
                successCallback(events);
            } catch (error) {
                console.error('Erreur lors du chargement des événements pour FullCalendar:', error);
                failureCallback(error);
            }
        },
        eventDrop: async function(info) {
            const { event } = info;
            console.log('Événement déplacé:', event);

            if (!event.start || (event.end && isNaN(new Date(event.end).getTime()))) {
                console.error('L\'événement n\'a pas de dates de début ou de fin valides:', event);
                return;
            }

            const updatedEvent = {
                id: event.id,
                title: event.title,
                start_date: event.start.toISOString(),
                end_date: event.end ? event.end.toISOString() : null,
                all_day: event.allDay
            };

            try {
                await updateEvent(updatedEvent); // Mise à jour sur le serveur
                console.log('Événement mis à jour avec succès:', updatedEvent);
            } catch (error) {
                console.error('Erreur lors de la mise à jour de l\'événement:', error);
                info.revert(); // Annule le déplacement en cas d'erreur
            }
        },
        eventClick: function(info) {
            console.log('Événement cliqué:', info.event);
            openModal(info.event.start, info.event.end, info.event.id, info.event.title, info.event.allDay);
        },
        select: function(info) {
            console.log('Sélection de plage horaire:', info.start, info.end);
            openModal(info.start, info.end, null, '', false); // Passer false pour décocher "Toute la journée"
        }
    });

    await calendar.render();
    console.log('Calendrier rendu');
    await refreshCalendarEvents(calendar); // Rafraîchit les événements après le rendu initial du calendrier
    console.log('Modal initialisé');
    initializeModal(calendar);
});
