import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { error: 'API URL is not defined' },
      { status: 500 }
    );
  }
  
  try {
      const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to process the resume' },
      { status: 500 }
    )
  }
}