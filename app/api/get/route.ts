import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { message: 'Username is required' },
      { status: 400 }
    );
  }

  try {
    const query = `SELECT * FROM portfolios WHERE username = $1 ORDER BY id DESC LIMIT 1;`;
    // console.log("quey",query);
    const values = [`${username}`];
    // console.log(values);
    const result = await pool.query(query, values);
    // console.log(result);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: 'Portfolio not found' },
        { status: 404 }
      );
    }

    const portfolioData = result.rows[0];
    // console.log(portfolioData);
    return NextResponse.json(portfolioData);
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { message: 'Failed to retrieve portfolio' },
      { status: 500 }
    );
  }
}