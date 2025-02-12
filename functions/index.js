const { onValueCreated } = require("firebase-functions/v2/database");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp(); // ✅ Initialize Firebase Admin SDK

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "snyderhousing@gmail.com",
        pass: "pjea ujgq tkmf nogs",
    },
});

// ✅ Correct Firebase Realtime Database Trigger for Firebase Functions v6+
exports.sendEmail = onValueCreated("/contact-submissions/{id}", async (event) => {
    const data = event.data.val(); // Get new entry data
    if (!data) return null;

    const mailOptions = {
        from: "snyderhousing@gmail.com",
        to: "snyderhousing@gmail.com",
        subject: `New Booking Request - ${data.property}`,
        text: `
Name: ${data.firstName} ${data.lastName}
Property: ${data.property}
Check-in: ${data.checkIn}
Check-out: ${data.checkOut}
Phone: ${data.phone}
Email: ${data.email}
Company: ${data.companyName}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully");
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }

    return null;
});

