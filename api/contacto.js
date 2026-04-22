import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Método no permitido' });
  }

  const { nombre, email, telefono, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ status: 'error', message: 'Faltan campos obligatorios' });
  }

  try {
    const data = await resend.emails.send({
      from: 'Segnec Web <consultas@segnec.com.ar>',
      to: ['info@segnec.com.ar'],
      subject: 'Nueva consulta desde la web Segnec',
      reply_to: email,
      text: `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono || 'No proporcionado'}\nMensaje:\n${mensaje}`,
    });

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Error al enviar el email' });
  }
}
