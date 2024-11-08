import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  
  try {
    const response = await fetch("http://139.84.156.72:8000/extract", {
      method: 'POST',
      body: formData,
    })
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process the resume' },
      { status: 500 }
    )
  }
}