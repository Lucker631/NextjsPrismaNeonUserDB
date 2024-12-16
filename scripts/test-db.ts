// test-db.ts
const { PrismaClient } = require('@prisma/client')

async function testConnection() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })
  
  try {
    // Test the connection
    await prisma.$connect()
    console.log('Successfully connected to the database')
    
    // List all tables
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    console.log('Available tables:', tables)
    
    // Try to count users
    const userCount = await prisma.user.count()
    console.log('Number of users:', userCount)
    
  } catch (error) {
    console.error('Database connection error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
  .catch((e) => {
    console.error('Test failed:', e)
    process.exit(1)
  })