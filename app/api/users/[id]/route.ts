import { NextResponse } from 'next/server'
import * as User from '@/lib/models/User'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await User.getUserById(parseInt(id))
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch user', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const user = await User.updateUser(parseInt(id), body)
    
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update user', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const success = await User.deleteUser(parseInt(id))
    
    if (!success) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete user', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
