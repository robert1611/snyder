document.addEventListener("DOMContentLoaded", function () {
    const calendarElements = document.querySelectorAll(".calendar");

    function initializeCalendar(calendarEl) {
        let calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: "dayGridMonth",
            fixedWeekCount: true,
            showNonCurrentDates: true,
            height: "100%",// Changed from fixed height
            contentHeight: "auto", // Allow content to determine height
            
            
            expandRows: true, // Make sure rows expand to use available height
            handleWindowResize: true, // Enable responsive resizing
            headerToolbar: {
                left: "",
                center: "title",
                right: "prev,next"
            },
            events: function (fetchInfo, successCallback, failureCallback) {
                fetch("http://localhost:3000/fetch-calendar/all")
                    .then(response => response.json())
                    .then(data => {
                        let events = [];
                        [...data.airbnb, ...data.vrbo].forEach(event => {
                            events.push({
                                title: event.summary.includes("Reserved") ? "Booked" : "Blocked",
                                start: event.start,
                                end: event.end,
                                url: event.reservation_url,
                                color: event.summary.includes("Reserved") ? "red" : "blue"
                            });
                        });
                        successCallback(events);
                    })
                    .catch(error => {
                        console.error("Error fetching calendar data:", error);
                        failureCallback(error);
                    });
            }
        });
        
        calendar.render();
    }

    calendarElements.forEach(calendarEl => {
        initializeCalendar(calendarEl);
    });
});