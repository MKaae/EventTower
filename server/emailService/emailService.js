import { Resend } from 'resend';

import dotenv from "dotenv";
dotenv.config({ path:"../.env"});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(email) {
  const { data, error } = await resend.emails.send({
    from: 'welcomemail@mathiaskaae.dk',
    to: email,
    subject: 'Welcome Mail',
    html: '<p>Welcome to the Eventtower</p>'
  });

  if (error) {
    return console.log(error);
  }  
  console.log(data);
}