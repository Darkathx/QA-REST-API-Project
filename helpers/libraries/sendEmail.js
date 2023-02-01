const nodemailer = require('nodemailer');

const sendEmail = async (mailOptions) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: process.env.NODE_ENV === "production" ? true : false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,

        },

    });
    const info = await transporter.sendMail(mailOptions);
    console.log(`Message sent: ${info.messageId}`);
    return info;
}

module.exports = {sendEmail, };