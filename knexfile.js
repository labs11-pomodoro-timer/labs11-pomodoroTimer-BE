// Update with your config settings.

module.exports = {
  // ** This is where the development knexfile settings will go
  // development: {
  //   client: 'pg',
  //   connection: ‘postgres://focus-timer-db.coiuxw91e5mz.us-east-2.rds.amazonaws.com’,
  //   migrations: {
  //     directory: __dirname + ‘/data/migrations’
  //   },
  //   seeds: {
  //   directory: __dirname + ‘/data/seeds/development’
  //   }
  // }

  test: {
    client: 'pg',
    connection: 'postgres://focustimer:LambdaLabs11@'
  }
};
