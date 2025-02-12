import { app, database } from './firebase-config.js';
import { ref, set } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Checking Firebase connection...');
    console.log('Database object:', database);
    console.log('App object:', app);

    // Modal Elements
    const modal = document.getElementById('contactModal');
    const contactBtn = document.getElementById('contactBtn');
    const closeBtn = document.querySelector('.close-button');
    const contactForm = document.getElementById('contactForm');

    if (!contactBtn) {
        console.error('❌ Contact button not found');
        return;
    }

    // ✅ Open modal
    contactBtn.addEventListener('click', function() {
        console.log('✅ Contact button clicked');
        modal.style.display = 'block';
    });

    // ✅ Close modal when clicking close button
    closeBtn.addEventListener('click', function() {
        console.log('✅ Close button clicked');
        modal.style.display = 'none';
    });

    // ✅ Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            console.log('✅ Clicked outside modal, closing it');
            modal.style.display = 'none';
        }
    });

    // ✅ Handle Form Submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();  // ✅ Prevent page reload

        console.log('Form submission started');

        try {
            if (!database || !app) {
                console.error('Firebase not properly initialized');
                throw new Error('Firebase not initialized');
            }

            // ✅ Collect form data
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

            // ✅ Save to Firebase
            const submissionId = Date.now().toString();
            const dbRef = ref(database, 'contact-submissions/' + submissionId);
            await set(dbRef, formData);
            console.log('✅ Firebase save successful!');

            // ✅ Send data to FormSubmit (hidden action)
            const formAction = contactForm.getAttribute('action');
            fetch(formAction, {
                method: 'POST',
                body: new FormData(contactForm)
            })
            .then(response => {
                console.log('✅ Email sent via FormSubmit');
            })
            .catch(error => console.error('❌ FormSubmit error:', error));

            // ✅ Reset form fields
            contactForm.reset();

            // ✅ Close the modal
            modal.style.display = 'none';

        } catch (error) {
            console.error('❌ Error during form submission:', error);
        }
    });
});


