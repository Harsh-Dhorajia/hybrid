module.exports = {
  port: process.env.MONGODB_DATABASE_URL || 3000,
  mongodbUrl: process.env.MONGODB_DATABASE_URL || 'mongodb://localhost:27017/hybrid-db',
  tokenSecretKey: process.env.TOKEN_SECRET_KEY || '0rfFRKOz2LJ9dKlgMWKuuMmhJXWMHlIGkzdRbnGSxkwtZakk3E',
  tokenExpiryTime: process.env.TOKEN_EXPIRY_TIME || '1d',
}
