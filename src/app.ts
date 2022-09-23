import express, { Application } from 'express'
import dotenv from 'dotenv'
// router
import UserRoutes from './core/routes/UserRoutes'
// DB 연결
import DBConnection from './core/db/DBConnection'
import helmet from 'helmet'

dotenv.config()

export class App {
  private app: Application
  private port: number | string

  constructor() {
    this.app = express()
    this.port = process.env.PORT || 8080
    this.routes()
    this.dbConn()
    this.middleware()
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.info(`Server on ${this.port}`)
    })
  }

  private routes(): void {
    this.app.use('/users', UserRoutes)
  }

  private dbConn(): void {
    DBConnection.connection()
  }

  private middleware(): void {
    this.app.use(helmet())
  }
}
