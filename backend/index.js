const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.post('/send-appointment', (req, res) => {
    const { name, email, phone, date, time } = req.body;
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sainagabharatreddy@gmail.com',
            pass:  'ayvj bonv gqqb qszl'// Replace with your Gmail app password
        }
    });

    const mailOptions = {
        from: 'sainagabharatreddy@gmail.com',
        to: email,
        subject: 'New Dental Appointment',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Appointment booked successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
