import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { texto, origen, destino } = await req.json();
    if (!texto || !destino) {
      return Response.json({ error: 'Faltan datos' }, { status: 400 });
    }
    if (origen === destino) {
      return Response.json({ traduccion: texto });
    }
    const IDIOMAS = { es:'español', en:'english', pt:'portuguese', fr:'french', it:'italian', de:'german', zh:'chinese', ru:'russian' };
    const idiomaDestino = IDIOMAS[destino] || destino;
    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `Translate the following text to ${idiomaDestino}. Return ONLY the translated text, nothing else:\n\n${texto}`
      }]
    });
    const traduccion = msg.content[0].text.trim();
    return Response.json({ traduccion });
  } catch (err) {
    console.error('Translate error:', err.message);
    return Response.json({ error: 'Error al traducir' }, { status: 500 });
  }
}