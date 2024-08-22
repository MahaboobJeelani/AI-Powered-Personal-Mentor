const nodemailer = require('nodemailer')

const sendMail = async (email, subject, text) => {
    try {
        const transpoter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            secure: Boolean(process.env.EMAIL_PORT),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        await transpoter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text
        })

    } catch (error) {
        console.log('Error send mail', error.message);
    }
}

module.exports = sendMail;