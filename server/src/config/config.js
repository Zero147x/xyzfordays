module.exports = {
  port: 8081,
  db: {
    database: 'postgres://blzhjagr:PDPubGTLDylAWpYysb6jfqFTJ2q_2GN9@elmer.db.elephantsql.com:5432/blzhjagr',
    options: {
      dialect: process.env.DIALECT || 'postgres',
      host: process.env.HOST || 'localhost'
    }
  }
}