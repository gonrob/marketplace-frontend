export async function POST(request) {
  const { texto, idiomaOrigen, idiomaDestino } = await request.json();

  if (!texto || !idiomaDestino) {
    return Response.json({ error: 'Faltan datos' }, { status: 400 });
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `Traduce este texto al ${idiomaDestino}. Responde SOLO con la traduccion, sin explicaciones ni comillas:\n\n${texto}`
      }]
    })
  });

  const data = await response.json();
  const traduccion = data.content?.[0]?.text || texto;

  return Response.json({ traduccion });
}