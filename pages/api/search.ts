import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
  ) {
    try{
        let userId = request.query.user_id;
        let search_text = request.query.search_text;
        if (Array.isArray(userId)) {
            userId = userId[0];
        }
        if (Array.isArray(search_text)) {
        search_text = search_text[0];
        }
        if (!userId) {
        throw new Error('User ID is required');
        }

        const userNotes = await sql`
              SELECT * FROM user_inputs
              WHERE user_id = ${userId}
              AND input_text ILIKE '%' || ${search_text} || '%'
              `;
      
          response.status(200).json({ userNotes });
        } catch (error:any) {
          response.status(500).json({ error: error.message });
        }
      }