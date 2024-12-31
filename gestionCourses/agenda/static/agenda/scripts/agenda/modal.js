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
