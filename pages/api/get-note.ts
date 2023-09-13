import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    let userId = request.query.user_id; // Use request.query to access query parameters
    let targetDate = request.query.timestamp;

    if (Array.isArray(userId)) {
      userId = userId[0];
    }
    if (Array.isArray(targetDate)) {
      targetDate = targetDate[0];
    }
    if (!userId) {
      throw new Error('User ID is required');
    }

    const userNotes = await sql`
    SELECT * FROM user_inputs
    WHERE user_id = ${userId}
    AND DATE_TRUNC('day', timestamp) = ${targetDate}
    `;

    // const timestamps = userNotes.rows.map((row) => row.timestamp);

    // console.log("this is the timestamp query:", timestamps); 

    // const userNoteTimeStamped = userNotes.rows.filter(
    //   (note) => note.timestamp.toISOString().split('T')[0] === targetDate
    // );

    return response.status(200).json({ userNotes });
  } catch (error: any) {
    return response.status(500).json({ error: error.message });
  }
}
