import pool from '@/lib/db'

export interface User {
  id?: number
  email: string
  name: string
  created_at?: Date
}

export async function createUser(email: string, name: string): Promise<User> {
  const result = await pool.query(
    'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *',
    [email, name]
  )
  return result.rows[0]
}

export async function getUserById(id: number): Promise<User | null> {
  const result = await pool.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  )
  return result.rows[0] || null
}

export async function getAllUsers(): Promise<User[]> {
  const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC')
  return result.rows
}

export async function updateUser(id: number, data: Partial<User>): Promise<User> {
  const fields: string[] = []
  const values: any[] = []
  let paramIndex = 1

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== 'id' && key !== 'created_at') {
      fields.push(`${key} = $${paramIndex}`)
      values.push(value)
      paramIndex++
    }
  }

  values.push(id)
  const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`
  const result = await pool.query(query, values)
  return result.rows[0]
}

export async function deleteUser(id: number): Promise<boolean> {
  const result = await pool.query('DELETE FROM users WHERE id = $1', [id])
  return (result.rowCount ?? 0) > 0
}
