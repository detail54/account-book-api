import mongoose from 'mongoose'

class DBConnection {
  public async connection() {
    try {
      if (process.env.DATABASE_URL) {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('connect mongo DB')
        return
      }

      throw new Error('not fount env "DATABASE_URL"')
    } catch (e) {
      throw e
    }
  }
}

export default new DBConnection()
