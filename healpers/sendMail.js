const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = data => {
    const email = {...data, from: 'rossgaluzinskiy@gmail.com'}
    sgMail.send(email);

    return true;
}

module.exports = {
    sendMail
}