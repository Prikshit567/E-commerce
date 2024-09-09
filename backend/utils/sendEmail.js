const nodeMailer = require("nodemailer");

const sendEmail = async(options)=>{
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD,
        }
    })

    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
    }
// console.log('SMPT_HOST:', process.env.SMPT_HOST);
// console.log('SMPT_PORT:', process.env.SMPT_PORT);
// console.log('SMPT_USER:', process.env.SMPT_MAIL);
// console.log('SMPT_PASSWORD:', process.env.SMPT_PASSWORD); 

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;