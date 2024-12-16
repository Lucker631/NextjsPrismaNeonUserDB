import { prisma } from '../../../../lib/prisma'
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

// Type definitions
interface UserInput {
  email: string
  name: string
  image: string
}

interface ErrorResponse {
  error: string
  missingFields?: string[]
}

// Custom error class for request validation
class ValidationError extends Error {
  constructor(message: string, public fields?: string[]) {
    super(message)
    this.name = 'ValidationError'
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    if (!users) {
      throw new Error("could not find any users")
    }
    return NextResponse.json(users)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    console.error('Error fetching users:', {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : 'No stack trace'
    })
    return NextResponse.json(
      { error: 'Failed to fetch users' } as ErrorResponse,
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    // Log the incoming request body for debugging
    const rawBody = await request.text()
    console.log('Incoming request body:', rawBody)

    // Parse the JSON body
    let json: UserInput
    
    try {
      json = JSON.parse(rawBody) as UserInput
    } catch (parseError) {
      console.error('JSON parse error:', parseError instanceof Error ? parseError.message : 'Invalid JSON')
      return NextResponse.json(
        { error: 'Invalid JSON body' } as ErrorResponse,
        { status: 400 }
      )
    }

    // Validate required fields
    const requiredFields = ['email', 'name', 'image'] as const
    const missingFields = requiredFields.filter(field => !json[field])
    
    if (missingFields.length > 0) {
      throw new ValidationError('Missing required fields', missingFields)
    }

    // Log the data we're about to send to Prisma
    console.log('Creating user with data:', json)

    const user = await prisma.user.create({
      data: {
        email: json.email,
        name: json.name,
        image: json.image
      }
    })

    console.log('Successfully created user:', user)
    return NextResponse.json(user)

  } catch (error) {
    // Handle different types of errors
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { 
          error: error.message, 
          missingFields: error.fields 
        } as ErrorResponse,
        { status: 400 }
      )
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'A user with this email already exists' } as ErrorResponse,
          { status: 409 }
        )
      }
    }

    // Log the error details
    console.error('Error creating user:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      code: error instanceof Prisma.PrismaClientKnownRequestError ? error.code : undefined
    })

    // Generic error response
    return NextResponse.json(
      { error: 'Failed to create user' } as ErrorResponse,
      { status: 500 }
    )
  }
}