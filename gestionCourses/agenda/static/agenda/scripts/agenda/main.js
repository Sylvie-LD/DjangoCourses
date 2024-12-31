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
