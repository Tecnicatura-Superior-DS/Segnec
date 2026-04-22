const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Método no permitido' });
  }

  // Verificar API Key
  if (!process.env.RESEND_API_KEY) {
    console.error('ERROR: RESEND_API_KEY no está configurada en las variables de entorno.');
    return res.status(500).json({ 
      status: 'error', 
      message: 'Configuración del servidor incompleta (falta API Key)' 
    });
  }

  const { nombre, email, telefono, mensaje } = req.body;

  // Validación básica
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ status: 'error', message: 'Faltan campos obligatorios' });
  }

  try {
    console.log(`Intentando enviar email desde: ${email}`);
    
    const { data, error } = await resend.emails.send({
      from: 'Segnec Web <consultas@segnec.com.ar>',
      to: ['info@segnec.com.ar'],
      subject: 'Nueva consulta desde la web Segnec',
      reply_to: email,
      text: `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono || 'No proporcionado'}\nMensaje:\n${mensaje}`,
    });

    if (error) {
      console.error('Error de Resend:', JSON.stringify(error));
      return res.status(400).json({ 
        status: 'error', 
        message: 'Resend no pudo enviar el email',
        details: error.message 
      });
    }

    console.log('Email enviado con éxito. ID:', data?.id);
    return res.status(200).json({ status: 'success', data });

  } catch (err) {
    console.error('Excepción al enviar email:', err.message);
    return res.status(500).json({ 
      status: 'error', 
      message: 'Error interno al procesar el envío',
      details: err.message
    });
  }
};
