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


console.log('Carousel script loaded');
console.log('carousel.js loaded');
console.log("carousel.js is definitely loading");

// Photo arrays for each property
const property1Photos = [
    '/images/39th/front.jpg',
    '/images/39th/living.jpg',
    '/images/39th/kitchen.jpg',
    '/images/39th/bed1.jpg',
    '/images/39th/bed1.jpg',
    '/images/39th/bed1.jpg',
    '/images/39th/bed1.jpg',
    '/images/39th/bed1.jpg',
    '/images/39th/bed1.jpg',
    '/images/39th/bed1.jpg',
    '/images/39th/bed1.jpg',
    '/images/39th/bed1.jpg',
    '/images/39th/bed1.jpg',
    '/images/39th/bed1.jpg',
    '/images/39th/bed1.jpg',
    '/images/39th/bed1.jpg',
    '/images/39th/bed1.jpg',
    '/images/39th/bed1.jpg',
    '/images/39th/bed1.jpg',










    // Add all photos for property 1
];

const property2Photos = [
    '/images/property2/photo1.jpg',
    '/images/property2/photo2.jpg',
    '/images/property2/photo3.jpg',
    // Add all photos for property 2
];

const property3Photos = [
    '/images/property3/photo1.jpg',
    '/images/property3/photo2.jpg',
    '/images/property3/photo3.jpg',
    // Add all photos for property 3
];

const property4Photos = [
    '/images/property4/photo1.jpg',
    '/images/property4/photo2.jpg',
    '/images/property4/photo3.jpg',
    // Add all photos for property 4
];

// Current index for each property
let currentIndex1 = 0;
let currentIndex2 = 0;
let currentIndex3 = 0;
let currentIndex4 = 0;

// Functions for Property 1
function nextImage1() {
    console.log('Next button clicked');  // Debug log
    currentIndex1 = (currentIndex1 + 1) % property1Photos.length;
    console.log('New index:', currentIndex1);  // Debug log
    console.log('New photo:', property1Photos[currentIndex1]);  // Debug log
    document.getElementById('mainPhoto').src = property1Photos[currentIndex1];
}

function prevImage1() {
    currentIndex1 = (currentIndex1 - 1 + property1Photos.length) % property1Photos.length;
    document.getElementById('mainPhoto').src = property1Photos[currentIndex1];
}

// Functions for Property 2
function nextImage2() {
    currentIndex2 = (currentIndex2 + 1) % property2Photos.length;
    document.getElementById('mainPhoto2').src = property2Photos[currentIndex2];
}

function prevImage2() {
    currentIndex2 = (currentIndex2 - 1 + property2Photos.length) % property2Photos.length;
    document.getElementById('mainPhoto2').src = property2Photos[currentIndex2];
}

// Functions for Property 3
function nextImage3() {
    currentIndex3 = (currentIndex3 + 1) % property3Photos.length;
    document.getElementById('mainPhoto3').src = property3Photos[currentIndex3];
}

function prevImage3() {
    currentIndex3 = (currentIndex3 - 1 + property3Photos.length) % property3Photos.length;
    document.getElementById('mainPhoto3').src = property3Photos[currentIndex3];
}

// Functions for Property 4
function nextImage4() {
    currentIndex4 = (currentIndex4 + 1) % property4Photos.length;
    document.getElementById('mainPhoto4').src = property4Photos[currentIndex4];
}

function prevImage4() {
    currentIndex4 = (currentIndex4 - 1 + property4Photos.length) % property4Photos.length;
    document.getElementById('mainPhoto4').src = property4Photos[currentIndex4];
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contactModal');
    const contactBtn = document.getElementById('contactBtn');
    const closeBtn = document.querySelector('.close-button');
    const contactForm = document.getElementById('contactForm');

    // Open modal
    contactBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    
    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            companyName: document.getElementById('companyName').value,
            property: document.getElementById('property').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };

        // Here you would typically send the data to your server
        console.log('Form submitted:', formData);
        
        // Clear form and close modal
        contactForm.reset();
        modal.style.display = 'none';
    });

});