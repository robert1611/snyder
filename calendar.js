document.addEventListener("DOMContentLoaded", function () {
    const calendarElements = document.querySelectorAll(".calendar");
    console.log("Found calendar elements:", calendarElements.length);

    function initializeCalendar(calendarEl, propertyId) {
        const propertyMap = {
            "3bed-snyder": "property1",
            "2bed-snyder": "property2",
            "2bed-ira": "property3",
            "2bed-lake": "property4"
        };

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
                fetch("https://papaya-genie-0b2c1e.netlify.app/.netlify/functions/fetchCalendar")

                    .then(response => response.json())
                    .then(data => {
                        const propertyData = data[propertyMap[propertyId]];
                        
                        if (!propertyData) {
                            console.error(`No data found for ${propertyId}`);
                            return failureCallback([]);
                        }

                        const events = [];

                        // Process Airbnb bookings - same format for all properties
                        if (propertyData.airbnb && Array.isArray(propertyData.airbnb)) {
                            propertyData.airbnb.forEach(booking => {
                                events.push({
                                    title: 'Airbnb',
                                    start: booking.start,
                                    end: booking.end,
                                    backgroundColor: '#FF5A5F',
                                    display: 'background',
                                    allDay: true
                                });
                            });
                        }

                        // Process VRBO bookings
                        if (propertyData.vrbo && Array.isArray(propertyData.vrbo)) {
                            propertyData.vrbo.forEach(booking => {
                                events.push({
                                    title: 'VRBO',
                                    start: booking.start,
                                    end: booking.end,
                                    backgroundColor: '#3B5998',
                                    display: 'background',
                                    allDay: true
                                });
                            });
                        }

                        console.log(`PROCESSED EVENTS for ${propertyId}:`, events);
                        successCallback(events);
                    })
                    .catch(error => {
                        console.error(`ERROR FETCHING CALENDAR for ${propertyId}:`, error);
                        failureCallback([]);
                    });
            }
        });

        calendar.render();
    }

    const propertyNames = ["3bed-snyder", "2bed-snyder", "2bed-ira", "2bed-lake"];

    calendarElements.forEach((calendarEl, index) => {
        if (propertyNames[index]) {
            initializeCalendar(calendarEl, propertyNames[index]);
        }
    });
});