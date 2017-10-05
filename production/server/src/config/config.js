module.exports = {
  port: 8081,
  db: {
    database: 'postgres://jufmzigzvshuct:a2a5ad77210d4d71f0c740a77bb50be09c2918ba4cabd6c015cd65d202f57eff@ec2-54-163-254-143.compute-1.amazonaws.com:5432/daulodni1pponv',
    options: {
      dialect: process.env.DIALECT || 'postgres',
      host: process.env.HOST || 'localhost',
      dialectOptions: {
        ssl: true
      }
    }
  },
  authentication: {
    jwtSecret: 'secret'
  }
}