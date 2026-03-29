export async function POST(request) {
  try {
    const { texto, idiomaOrigen, idiomaDestino } = await request.json();
    if (!texto || !idiomaDestino) return Response.json({ error: 'Faltan datos' }, { status: 400 });

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
          content: `Translate the following text to ${idiomaDestino}. Reply ONLY with the translation, no explanations or quotes:\n\n${texto}`
        }]
      })
    });

    const data = await response.json();
    const traduccion = data.content?.[0]?.text || texto;
    return Response.json({ traduccion });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Error de traduccion' }, { status: 500 });
  }
}
