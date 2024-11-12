// /pages/api/getPortfolio.ts
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { username } = req.query;

    if (!username || typeof username !== 'string') {
      return res.status(400).json({ message: 'Username is required' });
    }

    try {
      const query = `SELECT * FROM portfolios WHERE username = $1 LIMIT 1;`;
      const values = [username];
      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Portfolio not found' });
      }

      const portfolioData = result.rows[0];
      return res.status(200).json(portfolioData);
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Failed to retrieve portfolio' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
