import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});


export async function callOpenAI(prompt: string) {
  
  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a professional technical recruiter.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
  });

  return res.choices[0]?.message?.content?.trim() || '';
}


export async function callOpenAIChat(
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[]
) {
  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
  });

  return res.choices[0]?.message?.content?.trim() || '';
}
