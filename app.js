import { app, database } from './firebase-config.js';
import { ref, set } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js';

document.addEventListener('DOMContentLoaded', function() {
    // First, verify Firebase connection
    console.log('Checking Firebase connection...');
    console.log('Database object:', database);
    console.log('App object:', app);

    // Contact form functionality
    const modal = document.getElementById('contactModal');
    const contactBtn = document.getElementById('contactBtn');
    const closeBtn = document.querySelector('.close-button');
    const contactForm = document.getElementById('contactForm');

    if (!contactBtn) {
        console.error('Contact button not found');
        return;
    }

    // Open modal
    contactBtn.addEventListener('click', function() {
        console.log('Contact button clicked');
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
    contactForm.addEventListener('submit', async function(e) {
        console.log('Form submission started');

        try {
            // Verify Firebase is available at submission time
            if (!database || !app) {
                console.error('Firebase not properly initialized');
                console.log('Database:', database);
                console.log('App:', app);
                throw new Error('Firebase not initialized');
            }

            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                companyName: document.getElementById('companyName').value,
                property: document.getElementById('property').value,
                checkIn: document.getElementById('checkIn').value,
                checkOut: document.getElementById('checkOut').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                timestamp: new Date().toISOString()
            };

            console.log('About to save form data:', formData);

            // Create database reference and save
            const submissionId = Date.now().toString();
            const dbRef = ref(database, 'contact-submissions/' + submissionId);
            
            console.log('Database reference:', dbRef); // Add this line   
            console.log('Attempting Firebase save...');
            await set(dbRef, formData);
            console.log('Firebase save successful!');

            // Close modal and reset form
            modal.style.display = 'none';
            contactForm.reset();

        } catch (error) {
            console.error('Detailed error:', error);
            console.error('Error stack:', error.stack);
            alert('Error saving to database. Please check console for details.');
        }
    });
});