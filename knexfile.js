// Update with your config settings.



module.exports = {
  'development': {
    'client': 'pg',
    'connection': {
      host: process.env.DATABASE_URL,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PW,
      database: 'postgres'
    },
    'migrations': {
      'directory': __dirname + '/data/migrations'
    },
    'seeds': {
    'directory': __dirname + '/data/seeds/development'
    }
  }
}