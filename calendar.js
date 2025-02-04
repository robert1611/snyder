document.addEventListener("DOMContentLoaded", function () {
    const calendarElements = document.querySelectorAll(".calendar");
    console.log("Found calendar elements:", calendarElements.length);

    function initializeCalendar(calendarEl, propertyName) {
        let calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: "dayGridMonth",
            fixedWeekCount: true,
            showNonCurrentDates: true,
            height: "100%",
            contentHeight: "auto",
            expandRows: true,
            handleWindowResize: true,
            headerToolbar: {
                left: "",
                center: "title",
                right: "prev,next"
            },
            events: function (fetchInfo, successCallback, failureCallback) {
                console.log(`Fetching calendar data for ${propertyName}`);

                fetch("http://127.0.0.1:3000/fetch-calendar/all")
                    .then(response => response.json())
                    .then(data => {
                        console.log(`DATA RECEIVED for ${propertyName}:`, data[propertyName]);

                        if (!data[propertyName]) {
                            console.error(`❌ No data found for ${propertyName}`);
                            return failureCallback([]);
                        }

                        const events = [...(data[propertyName].airbnb || []), ...(data[propertyName].vrbo || [])].map(event => ({
                            title: "Blocked",
                            start: event.start,
                            end: event.end,
                            color: "red"
                        }));

                        console.log(`PROCESSED EVENTS for ${propertyName}:`, events);
                        successCallback(events);
                    })
                    .catch(error => {
                        console.error(`ERROR FETCHING CALENDAR for ${propertyName}:`, error);
                        failureCallback([]);
                    });
            }
        });

        calendar.render();
    }

    const propertyNames = ["property1", "property2", "property3", "property4"];
    
    calendarElements.forEach((calendarEl, index) => {
        if (propertyNames[index]) {
            initializeCalendar(calendarEl, propertyNames[index]);
        }
    });
});
