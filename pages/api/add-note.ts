import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user_id, input_text, input_number } = request.body;
    // const user_id = request.body.user_id;
    // const input_text = request.body.input_text;
    // const input_number = request.body.input_number;

    if (!user_id || !input_text) {
      return response.status(400).json({ error: 'User ID and input text are required' });
    }

    await sql`
      INSERT INTO user_inputs (user_id, input_text, input_number)
      VALUES (${user_id}, ${input_text}, ${input_number})
    `;

  const userInputs = await sql`SELECT * FROM user_inputs;`;
    return response.status(201).json({ message: 'Note added successfully', userInputs });
  } catch (error: any) {
    return response.status(500).json({ error: error.message });
  }
}
