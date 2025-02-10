const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'snyderhousing@gmail.com',
        pass: 'pjea ujgq tkmf nogs'
    }
});

exports.sendEmail = functions.database.ref('/contact-submissions/{id}')
    .onCreate((snapshot) => {
        const data = snapshot.val();
        const mailOptions = {
            from: 'snyderhousing@gmail.com',
            to: 'snyderhousing@gmail.com',
            subject: `New Booking Request - ${data.property}`,
            text: `
Name: ${data.firstName} ${data.lastName}
Property: ${data.property}
Check-in: ${data.checkIn}
Check-out: ${data.checkOut}
Phone: ${data.phone}
Email: ${data.email}
Company: ${data.companyName}
            `
        };
        return transporter.sendMail(mailOptions);
    });