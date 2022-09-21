import express, { Application } from 'express'
import dotenv from 'dotenv'
// router
import UserRoutes from './core/routes/UserRoutes'

dotenv.config()

export class App {
  private app: Application
  private port: number | string

  constructor() {
    this.app = express()
    this.port = process.env.PORT || 8080
    this.routes()
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.info(`Server on ${this.port}`)
    })
  }

  private routes(): void {
    this.app.use('/users', UserRoutes)
  }
}
