import nodemailer from 'nodemailer';


const emailOlvidePassword = async (datos) => {
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const {email, nombre, token} = datos;

  const info = await transporter.sendMail({
    from: 'APV - Admin de pacientes',
    to: email,
    subject: 'Reestablece tu password',
    text: 'Reestablece tu password',
    html: `<p>Hola: ${nombre}, has solicitado reestablecer tu password</p>

           <p>Sigue el siguiente link para generar un nuevo password:
           <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer password</a></p>
           
           <p>Si tu no creaste esta cuenta puedes ignorar este mensaje</p>
    `
  });
  console.log(`Mensaje enviado... ${info.messageId}`);
}

export default emailOlvidePassword;