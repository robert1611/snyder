const { onRequest } = require('firebase-functions/v2/https');
const { onDatabaseCreated } = require('firebase-functions/v2/database');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const { onDocumentCreated } = require("firebase-functions/v2/firestore");

exports.emailBooking = onDocumentCreated('/contact-submissions/{id}', (event) => {
    const booking = event.data.val();

    console.log('Booking received:', booking);

    const mailTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'snyderhousing@gmail.com',
            pass: 'pjea ujgq tkmf nogs'
        }
    });

    const mailOptions = {
        from: 'snyderhousing@gmail.com',
        to: 'snyderhousing@gmail.com',
        subject: `New Booking - ${booking.property}`,
        text: `
Name: ${booking.firstName} ${booking.lastName}
Property: ${booking.property}
Check-in: ${booking.checkIn}
Check-out: ${booking.checkOut}
Phone: ${booking.phone}
Email: ${booking.email}
Company: ${booking.companyName}`
    };

    return mailTransport.sendMail(mailOptions)
        .then(() => console.log('Email sent successfully'))
        .catch((error) => console.error('Error sending email:', error));
});