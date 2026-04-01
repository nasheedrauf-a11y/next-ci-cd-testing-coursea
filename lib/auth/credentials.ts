import bcrypt from "bcryptjs"
import { query } from "@/lib/db"

export async function verifyCredentials(email: string, password: string) {
  try {
    const result = await query(
      "SELECT id, email, name, password_hash FROM users WHERE email = $1",
      [email]
    )

    if (result.rows.length === 0) {
      return null
    }

    const user = result.rows[0]

    if (!user.password_hash) {
      return null
    }

    const isValid = await bcrypt.compare(password, user.password_hash)

    if (!isValid) {
      return null
    }

    return {
      id: String(user.id),
      email: user.email,
      name: user.name,
    }
  } catch (error) {
    console.error("Error verifying credentials:", error)
    return null
  }
}

export async function registerUser(
  email: string,
  password: string,
  name: string
) {
  const passwordHash = await bcrypt.hash(password, 12)

  const existing = await query("SELECT id FROM users WHERE email = $1", [email])
  if (existing.rows.length > 0) {
    throw new Error("User already exists")
  }

  const result = await query(
    "INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3) RETURNING id, email, name",
    [email, name, passwordHash]
  )

  return {
    id: String(result.rows[0].id),
    email: result.rows[0].email,
    name: result.rows[0].name,
  }
}
