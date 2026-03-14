import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const result = await pool.query('SELECT NOW()')
    return NextResponse.json({
      status: 'connected',
      timestamp: result.rows[0].now,
      message: 'Successfully connected to database'
    })
  } catch (error:any) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to connect to database',
        error: error?.message
      },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    // Test creating a simple table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS test_table (
        id SERIAL PRIMARY KEY,
        data TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    return NextResponse.json({
      status: 'success',
      message: 'Test table created/verified'
    })
  } catch (error:any) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to create test table',
        error: error.message
      },
      { status: 500 }
    )
  }
}
