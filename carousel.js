console.log('Carousel script loaded');
console.log('carousel.js loaded');
console.log("carousel.js is definitely loading");

// Photo arrays for each property
const property1Photos = [
    '/images/39th/washer.jpg',
    '/images/39th/living.jpg',
    '/images/39th/kitchen.jpg',
    '/images/39th/kitchen2.jpg',
    '/images/39th/kitchen3.jpg',
    '/images/39th/bed1a.jpg',
    '/images/39th/bed1b.jpg',
    '/images/39th/bed1c.jpg',
    '/images/39th/bed2a.jpg',
    '/images/39th/bed3a.jpg',
    '/images/39th/bed3b.jpg',
    '/images/39th/washer.jpg',
    '/images/39th/backyard.jpg',
    '/images/39th/front2.jpg',
    '/images/39th/bath1a.jpg',
    '/images/39th/bath1c.jpg',
    '/images/39th/bath2a.jpg',
    
  
    // Add all photos for property 1
];

const property2Photos = [
    '/images/24th/kitchen1.jpg',
    '/images/24th/kitchen2.jpg',
    '/images/24th/front.jpg',
    
    '/images/24th/bed1a.jpg',
    '/images/24th/bed1b.jpg',
    '/images/24th/bed2a.jpg',
    '/images/24th/washer.jpg',
    '/images/24th/living1.jpg',
    '/images/24th/living2.jpg',
    '/images/24th/backyard.jpg',



    
    // Add all photos for property 2
];

const property3Photos = [
    '/images/bigira/kitchen1.jpg',
    '/images/bigira/living2.jpg',
    '/images/bigira/washer.jpeg',
    '/images/bigira/front.jpg',
    '/images/bigira/bed1a.jpg',
    '/images/bigira/bed2a.jpg',
    '/images/bigira/bath1.jpeg',
    '/images/bigira/bath2.jpeg',
    '/images/bigira/bath3.jpg',
    '/images/bigira/bath4.jpeg',
    // Add all photos for property 3
];

const property4Photos = [
    '/images/smallira/kitchen2.jpg',
    '/images/smallira/loft_view.jpg',
    '/images/smallira/washer.jpg',
    '/images/smallira/loft_ira.jpg',
    '/images/smallira/ladder.jpg',
    '/images/smallira/front1.jpg',
    '/images/smallira/front2.jpg',
    '/images/smallira/living_ira_rear.jpg',
    '/images/smallira/bath1.jpg',
    '/images/smallira/front3.jpg',
    

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