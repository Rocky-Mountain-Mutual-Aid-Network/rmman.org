const calendarEventSources = {
    rmman: {
        // RMMAN Calendar
        googleCalendarId: 'qsd8s5h8e961hleuu7ogvu1dks@group.calendar.google.com',
        displayEventTime: true,
        className: 'event-rmman',
    },
    rmpp: {
        // RMPP Calendar
        googleCalendarId: 'c_o4v9pvg07qd9fse0n7sn0ligts@group.calendar.google.com',
        displayEventTime: true,
        className: 'event-rmpp',
        color: "#960F43",
    },
    joys: {
        // Joy's Kitchen
        googleCalendarId: '303joyskitchen@gmail.com',
        displayEventTime: true,
        className: 'event-joy',
        color: '#3ec46d',
    }
};

document.addEventListener('DOMContentLoaded', function () {

    let calendarEl = document.getElementById('calendar'),
        calEvents = calendarEl.dataset.eventSource,
        calSources = [];

    // builds array of calenders to display
    // add data-event-source="rmpp,rmman" with comma separated list of
    // calendars which appear in calendarEventSources object above
    if (calEvents) {
        // if calEvents has data split it and push it into calEvents
        calEvents.split(',').forEach((el) => {
            if (calendarEventSources[el]) calSources.push(calendarEventSources[el]);
        });
    } else {
        // Return all event source values
        calSources =  Object.values(calendarEventSources);
    };

    // send an error if calSources is empty
    if (calSources.length < 1) console.error("The calendar source is empty, if you are using data-event-source be sure the name matches a key in calendarEventSources found in /assets/js/script-calendar.js");

    let calendar = new FullCalendar.Calendar(calendarEl, {
        contentHeight: 'auto',
        nowIndicator: 'true',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'listDays,dayGridMonth'
        },
        initialView: 'listDays',

        views: {
            listDays: {
                type: 'list',
                duration: { days: 14 },
                buttonText: 'Agenda'
            }
        },

        eventSources: calSources,

        googleCalendarApiKey: 'AIzaSyAJGqw59earJuG0-nprn5LtuVt-62L00-s',

        eventDidMount: function (info) {
            // fires when event mounts
        },

        eventClick: function (arg) {

            // unless it's a list view, just open up the event url
            if (!calendar.currentData.currentViewType.startsWith('list')) {
                window.open(arg.event.url, 'rmman-event', 'heigh=500,width=300');
                arg.jsEvent.preventDefault();
                return false;
            }

            let elClassName = 'event-card',
                wrapperClassName = 'event-card-wrapper',
                descClassName = 'event-card__description';
            
            // builds the html elements
            let el = document.createElement('aside');
            let title = document.createElement("h1");
            let time = document.createElement("h2");
            let start = document.createElement("time");
            let end = document.createElement("time");
            let add = document.createElement("a");
            let desc = document.createElement("div");

            el.className = elClassName;

            title.className = 'title is-4';
            title.innerText = arg.event.title;

            // configures the start time formatting
            start.setAttribute('datetime', calendar.formatIso(arg.event.start));
            start.innerText = calendar.formatDate(arg.event.start, {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            });

            // configures the end time formatting
            end.setAttribute('datetime', calendar.formatIso(arg.event.end));
            end.innerText = calendar.formatDate(arg.event.end, {
                hour: 'numeric',
                minute: 'numeric',
            });

            time.className = 'subtitle is-5';

            // if it's an all day event only show the start time
            if (arg.event.allDay) {
                time.append(start);
            } else {
                time.append(start, " — ", end);
            }

            // the add to calendar button
            add.className = 'button is-primary is-outlined'
            add.innerHTML = "➕ Add to Calendar";
            add.href = arg.event.url;
            add.target = "_blank";

            desc.className = descClassName;
            desc.innerHTML = arg.event.extendedProps.description;

            // put it all together into an element
            el.append(title, time, add, desc);

            // get the container element of the event we click
            let container = arg.el;
            // create a tr>td node to put our element
            let wrapper = document.createElement('tr');
            wrapper.className = wrapperClassName;
            wrapper.append(document.createElement('td'));
            wrapper.firstChild.append(el);
            // set the colSpan based on the number of columns that exist
            wrapper.firstChild.colSpan = container.childElementCount;

            // if the event is open, close it, otherwise add our wrapper after clicked event
            if (container.classList.contains('open')) {
                // double check that we are removing the event card wrapper
                if (container.nextSibling.className == wrapperClassName) container.nextSibling.remove();
            } else {
                container.after(wrapper);
            }
            
            // sets a class to the clicked event
            container.classList.toggle('open');

            // prevents click from doing anything we don't want
            arg.jsEvent.preventDefault();
        }

    });

    calendar.render();
});