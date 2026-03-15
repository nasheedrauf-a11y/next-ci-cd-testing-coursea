const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'colors',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

async function initializeDatabase() {
  console.log('Initializing database...')
  
  try {
    // Test connection
    const client = await pool.connect()
    const result = await client.query('SELECT NOW()')
    console.log('Database connection successful:', result.rows[0].now)
    client.release()
    
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('Users table created/verified')
    
    // Seed users if empty
    const userCount = await pool.query('SELECT COUNT(*) as count FROM users')
    if (parseInt(userCount.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO users (email, name) VALUES 
          ('admin@example.com', 'Admin User'),
          ('user1@example.com', 'Jane Smith'),
          ('user2@example.com', 'Bob Johnson')
      `)
      console.log('Sample users inserted')
    }
    
    console.log('Database initialization complete!')
    await pool.end()
    process.exit(0)
  } catch (error) {
    console.error('Database initialization failed:', error)
    await pool.end()
    process.exit(1)
  }
}

initializeDatabase()
