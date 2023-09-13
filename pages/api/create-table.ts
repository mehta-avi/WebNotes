import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const result =
      await sql`CREATE TABLE user_inputs (
                  id SERIAL PRIMARY KEY,
                  user_id VARCHAR(255) NOT NULL,
                  timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
                  input_text TEXT,
                  input_number INTEGER
                );`;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}