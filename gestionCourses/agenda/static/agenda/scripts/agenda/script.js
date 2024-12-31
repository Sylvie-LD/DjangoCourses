document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Vue initiale
        selectable: true,
        select: function(info) {
            // Met à jour les champs du modal avec les dates sélectionnées
            document.getElementById('modal-start_date').value = formatDate(info.start);
            document.getElementById('modal-end_date').value = formatDate(info.end);
            document.getElementById('myModal').classList.add('is-active');
        },
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: loadEvents(),
        eventContent: function(arg) {
            return { html: `<div>${arg.event.title}</div>` };
        }
    });

    calendar.render();

    document.getElementById('modal-event-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('modal-title').value;
        const startDate = document.getElementById('modal-start_date').value;
        const endDate = document.getElementById('modal-end_date').value;

        if (!title || !startDate || !endDate) {
            document.getElementById('modal-error-message').classList.remove('is-hidden');
            document.getElementById('modal-error-message').textContent = 'Veuillez remplir tous les champs.';
            return;
        }

        const events = loadEvents();
        events.push({ title, startDate, endDate });
        localStorage.setItem('events', JSON.stringify(events));

        calendar.addEvent({
            title: title,
            start: startDate,
            end: endDate,
            backgroundColor: 'yellow',
            borderColor: 'black',
            textColor: 'black'
        });

        document.getElementById('myModal').classList.remove('is-active');
        document.getElementById('modal-event-form').reset();
        document.getElementById('modal-error-message').classList.add('is-hidden');
    });

    document.getElementById('modal-close').addEventListener('click', function() {
        document.getElementById('myModal').classList.remove('is-active');
    });

    document.querySelector('.modal-background').addEventListener('click', function() {
        document.getElementById('myModal').classList.remove('is-active');
    });

    function formatDate(date) {
        return new Date(date).toISOString().slice(0, 16);
    }

    function loadEvents() {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        return events.map(event => ({
            title: event.title,
            start: event.startDate,
            end: event.endDate,
            backgroundColor: 'yellow',
            borderColor: 'black',
            textColor: 'black'
        }));
    }
});
