// Function to check if Google Maps API is loaded
function checkGoogleMapsLoaded() {
    if (!window.google || !window.google.maps) {
        console.error('Google Maps API not loaded. Check your API key and console for errors.');
        return false;
    }
    console.log('Google Maps API loaded successfully');
    return true;
}

// Handle authentication failure
window.gm_authFailure = function() {
    console.error('Google Maps authentication failed. Check your API key.');
    alert('Google Maps failed to load. Please check your API key.');
};

// Make initMap available globally FIRST
window.initMap = function() {
    if (!checkGoogleMapsLoaded()) return;

    console.log('Initializing map...');
    
    const mapContainer = document.querySelector('.map-container');
    console.log('Map container found:', mapContainer);
    
    if (!mapContainer) {
        console.error('Map container not found');
        return;
    }

    // Create search container
    const searchDiv = document.createElement('div');
    searchDiv.style.padding = '10px';
    searchDiv.style.backgroundColor = 'white';
    searchDiv.style.marginBottom = '10px';
    searchDiv.innerHTML = `
        <input id="search-input" type="text" placeholder="Enter an address" style="width: 200px; padding: 5px;">
        <select id="property-select" style="padding: 5px;">
            <option value="">Select property to measure distance to</option>
            <option value="32.703139,-100.932412">Three Bedroom in Snyder</option>
            <option value="32.717791,-100.903570">Two Bedroom in Snyder</option>
            <option value="32.582158,-101.001340">Two Bedroom in Ira</option>
        </select>
        <select id="unit-select" style="padding: 5px;">
            <option value="MILES">Miles</option>
            <option value="KILOMETERS">Kilometers</option>
        </select>
        <button id="calculate-distance" style="padding: 5px;">Calculate Distance</button>
        <button id="clear-map" style="padding: 5px; margin-left: 5px;">Clear</button>
        <div id="distance-result" style="margin-top: 5px;"></div>
    `;
    mapContainer.appendChild(searchDiv);

    const mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    mapDiv.style.width = '100%';
    mapDiv.style.height = 'calc(100% - 80px)';
    mapContainer.appendChild(mapDiv);

    const snyder = { lat: 32.7179, lng: -100.9176 };
    
    const map = new google.maps.Map(mapDiv, {
        zoom: 10,
        center: snyder,
    });

    // Initialize the Places Autocomplete
    const input = document.getElementById('search-input');
    const autocomplete = new google.maps.places.Autocomplete(input);
    
    const properties = [
        {
            position: { lat: 32.703139, lng: -100.932412 },
            title: "Three Bedroom in Snyder",
            address: "3005 39th Street, Snyder, TX 79549"
        },
        {
            position: { lat: 32.717791, lng: -100.903570 },
            title: "Two Bedroom in Snyder",
            address: "604 24th street"
        },
        {
            position: { lat: 32.582158, lng: -101.001340 },
            title: "Two Bedroom in Ira",
            address: "5960 W FM 1606, Ira, TX 79527"
        }
    ];

    // Add markers
    properties.forEach(property => {
        const marker = new google.maps.Marker({
            position: property.position,
            map: map,
            title: property.title
        });

        const infowindow = new google.maps.InfoWindow({
            content: `<h3>${property.title}</h3><p>${property.address}</p>`
        });

        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });
    });

    // Distance calculation
    const distanceService = new google.maps.DistanceMatrixService();
    document.getElementById('calculate-distance').addEventListener('click', () => {
        const address = document.getElementById('search-input').value;
        const selectedProperty = document.getElementById('property-select').value;
        const unitSystem = document.getElementById('unit-select').value;
        
        if (!address || !selectedProperty) {
            alert('Please enter an address and select a property');
            return;
        }

        const [lat, lng] = selectedProperty.split(',');
        
        distanceService.getDistanceMatrix({
            origins: [address],
            destinations: [{ lat: parseFloat(lat), lng: parseFloat(lng) }],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: unitSystem === 'MILES' ? google.maps.UnitSystem.IMPERIAL : google.maps.UnitSystem.METRIC
        }, (response, status) => {
            if (status === 'OK') {
                const distance = response.rows[0].elements[0].distance.text;
                const duration = response.rows[0].elements[0].duration.text;
                document.getElementById('distance-result').innerHTML = 
                    `Distance: ${distance}<br>Driving time: ${duration}`;
            } else {
                alert('Error calculating distance');
            }
        });
    });

    // Clear button functionality
    document.getElementById('clear-map').addEventListener('click', () => {
        document.getElementById('search-input').value = '';
        document.getElementById('property-select').value = '';
        document.getElementById('distance-result').innerHTML = '';
        document.getElementById('unit-select').value = 'MILES';
        map.setCenter(snyder);
        map.setZoom(10);
    });
};
