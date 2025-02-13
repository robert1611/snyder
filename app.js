import { app, database } from './firebase-config.js';
import { ref, set } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Checking Firebase connection...');
    
    // Force initial modal state
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'none';
    }

    const contactBtn = document.getElementById('contactBtn');
    const closeBtn = document.querySelector('.close-button');
    const contactForm = document.getElementById('contactForm');

    if (!contactBtn) {
        console.error('❌ Contact button not found');
        return;
    }

    // Open modal
    contactBtn.addEventListener('click', function() {
        console.log('✅ Contact button clicked');
        modal.style.display = 'block';
    });

    // Close modal when clicking close button
    closeBtn.addEventListener('click', function() {
        console.log('✅ Close button clicked');
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            console.log('✅ Clicked outside modal, closing it');
            modal.style.display = 'none';
        }
    });

    // Handle Form Submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Form submission started');

        try {
            if (!database || !app) {
                throw new Error('Firebase not initialized');
            }

            // Collect form data
            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                companyName: document.getElementById('companyName').value.trim(),
                property: document.getElementById('property').value.trim(),
                checkIn: document.getElementById('checkIn').value,
                checkOut: document.getElementById('checkOut').value,
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                timestamp: new Date().toISOString()
            };

            // Validate required fields
            for (const [key, value] of Object.entries(formData)) {
                if (!value && key !== 'companyName') {
                    throw new Error(`${key} is required`);
                }
            }

            console.log('About to save form data:', formData);

            // Get references and data ready
            const submissionId = Date.now().toString();
            const dbRef = ref(database, 'contact-submissions/' + submissionId);
            const formAction = contactForm.getAttribute('action');
            const formSubmitData = new FormData(contactForm);

            // Run Firebase save and FormSubmit in parallel
            await Promise.all([
                set(dbRef, formData),
                formAction ? fetch(formAction, {
                    method: 'POST',
                    body: formSubmitData
                }) : Promise.resolve()
            ]);

            console.log('✅ Firebase save successful!');
            console.log('✅ Email sent via FormSubmit');

            // Success cleanup
            contactForm.reset();
            modal.style.display = 'none';
            alert('Thank you for your submission!');

        } catch (error) {
            console.error('❌ Error during form submission:', error);
            alert('There was an error submitting the form. Please try again.');
        }
    });
});

