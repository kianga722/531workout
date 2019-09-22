require('dotenv').config();
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASS,
  },
});

module.exports = {
  sendEmail(from, to, subject, html) {
    return new Promise((resolve, reject) => {
      transport.sendMail({
        from, subject, to, html,
      }, (err, info) => {
        if (err) reject(err);

        resolve(info);
      });
    });
  },
};
