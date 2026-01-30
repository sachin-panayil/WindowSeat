import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function testConnection() {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Say "connected for free with education connected then say a random sentence related to that. Keep it very short." and nothing else.' }],
      max_tokens: 10
    });
    console.log('✓ OpenAI connected:', response.choices[0].message.content);
  } catch (error) {
    console.error('✗ Connection failed:', error);
  }
}

testConnection();