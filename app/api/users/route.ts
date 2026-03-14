import { NextResponse } from 'next/server'
import * as User from '@/lib/models/User'

export async function GET() {
  try {
    const users = await User.getAllUsers()
    return NextResponse.json({ users })
  } catch (error:any) {
    return NextResponse.json(
      { message: 'Failed to fetch users', error: error?.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name } = body

    if (!email || !name) {
      return NextResponse.json(
        { message: 'Email and name are required' },
        { status: 400 }
      )
    }

    const user = await User.createUser(email, name)
    return NextResponse.json({ user }, { status: 201 })
  } catch (error:any) {
    return NextResponse.json(
      { message: 'Failed to create user', error: error?.message },
      { status: 500 }
    )
  }
}
