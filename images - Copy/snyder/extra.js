document.addEventListener("DOMContentLoaded", function () {
    let calendarEl = document.getElementById("calendar");

    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        fixedWeekCount: false, // Ensures exactly 5 rows are displayed
        showNonCurrentDates: true, // Hides extra days from the previous/next month
        height: 300, // Keeps calendar compact
        contentHeight: 300,
        handleWindowResize: true,
        scrollTime: '00:00:00',
        scrollTimeReset: false,
        aspectRatio: 1.5,  // Add this to control width/height ratio
      
        dayMaxEvents: false,  // When there are too many events, show a popover
        stickyHeaderDates: false,


        headerToolbar: {
            left: "", // Removes the "Today" button
            center: "title", // Keeps only the month title
            right: "prev,next" // Keeps navigation buttons
        },

        events: function (fetchInfo, successCallback, failureCallback) {
            fetch("http://localhost:3000/fetch-calendar/all")
                .then(response => response.json())
                .then(data => {
                    console.log("Calendar data received:", data);  // Add this lin
                    let events = [];

          // Airbnb Events (Red) - Push first so they appear on top
          data.airbnb.forEach(event => {
            events.push({
                title: event.summary.includes("Reserved") ? "Booked" : "Blocked",
                start: event.start,
                end: event.end,
                url: event.reservation_url,
                color: "red"
            });
        });

        // VRBO Events (Blue) - Push after Airbnb events so they appear below
        data.vrbo.forEach(event => {
            events.push({
                title: event.summary.includes("Reserved") ? "Booked" : "Blocked",
                start: event.start,
                end: event.end,
                color: "blue"
            });
        });
        console.log("Processed events:", events);  // Add this line
                    successCallback(events);
                })
                .catch(error => {
                    console.error("Error fetching calendar data:", error);
                    failureCallback(error);
                });
        }
    });

    calendar.render();
});
