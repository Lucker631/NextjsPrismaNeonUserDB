import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, image } = body

    const formSubmission = await prisma.formSubmission.create({
      data: {
        name,
        email,
        image,
      },
    })

    return NextResponse.json(formSubmission, { status: 201 })
  } catch (error) {
    console.error('Failed to submit form:', error)
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

