import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, resumeData, template, portfolioContent } = body;

    const query = `
      INSERT INTO portfolios (username, resume_data, template, portfolio_content)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const values = [username, resumeData, template, portfolioContent];
    
    const result = await pool.query(query, values);

    return NextResponse.json({ 
      id: result.rows[0].id, 
      message: 'Portfolio saved successfully.' 
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { message: 'Failed to save portfolio.' },
      { status: 500 }
    );
  }
}