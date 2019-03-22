const { Pool, Client } = require('pg')

const pool = new Pool({
    host: 'focus-timer-db.coiuxw91e5mz.us-east-2.rds.amazonaws.com',
    user: 'focustimer',
    password: 'LambdaLabs11',
    database: 'postgres',
    port: '5432'
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

const client = new Client({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})