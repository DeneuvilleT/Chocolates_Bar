import nodemailer from 'nodemailer';
import 'dotenv/config';

const nodeMail = async (toMail) => {

   const transporter = nodemailer.createTransport({
      host: "mail.gandi.net",
      port: 465,
      secure: true,
      auth: {
         user: process.env.USER_MAIL,
         pass: process.env.PASSWORD_MAIL,
      },
      tls: {
         rejectUnauthorized: false
      }
   });

   const info = await transporter.sendMail({
      from: `"Chocolate's Bar" <contact@chocolaté-bar.store>`,
      to: toMail,
      subject: "Vérification de votre adresse mail",
      text: "Bienvenue sur le Chocolate's Bar",
      html: `<b>Bienvenue sur le Chocolate's Bar</b><p>Cliquez sur le lien pour valider et activer votre compte.<p><a href='${process.env.URL_DOMAIN}/#/customer/updateValidate/${toMail}'>Cliquez ici</a>`
   });

   console.log("Message sent: %s", info.messageId);
};

export default nodeMail;