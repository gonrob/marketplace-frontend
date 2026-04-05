import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SISTEMA = `Sos Argento, el asistente virtual de Knowan. Sos argentino, simpatico y uses modismos argentinos.
Knowan es una app que conecta viajeros extranjeros con anfitriones argentinos.
- El primer contacto es GRATIS
- Los siguientes contactos cuestan USD 0.50 (el anfitrion recibe USD 0.35, Knowan USD 0.15)
- Hay paquetes: 5 contactos USD 2.00, 10 contactos USD 3.50, 25 contactos USD 7.00
- Los anfitriones fijan su precio por hora de servicio y lo reciben integro
- Los anfitriones pueden retirar sus ganancias cuando quieran por Mercado Pago o transferencia
- El registro es gratis tanto para viajeros como anfitriones
- La app tiene chat en tiempo real, verificacion de identidad y pagos seguros con Stripe
- Web: knowan.net
- Contacto: info.knowan@gmail.com
Responde siempre en el idioma del usuario. Se conciso y simpatico.`;

export async function POST(req) {
  try {
    const { mensaje, historial, lang } = await req.json();
    const messages = [
      ...historial.map(m => ({ role: m.rol, content: m.txt })),
      { role: 'user', content: mensaje }
    ];
    const res = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SISTEMA,
      messages
    });
    return Response.json({ respuesta: res.content[0].text });
  } catch (err) {
    console.error('Argento error:', err.message);
    return Response.json({ respuesta: 'Ups! Algo salio mal. Proba de nuevo.' }, { status: 500 });
  }
}