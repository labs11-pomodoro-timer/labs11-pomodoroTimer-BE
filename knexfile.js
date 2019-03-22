// Update with your config settings.



module.exports = {
  'development': {
    'client': 'pg',
    'connection': {
      host: 'focus-timer-db.coiuxw91e5mz.us-east-2.rds.amazonaws.com',
      user: 'focustimer',
      password: 'LambdaLabs11',
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