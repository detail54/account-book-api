import express, { Application } from 'express'
import dotenv from 'dotenv'
// DB 연결
import DBConnection from './core/db/DBConnection'
import helmet from 'helmet'
// router
import UserRoutes from './core/routes/UserRoutes'
import StoreCategoryRoutes from './core/routes/StoreCategoryRoutes'
import StoreRoutes from './core/routes/StoreRoutes'

dotenv.config()

export class App {
  private app: Application
  private port: number | string

  constructor() {
    this.port = process.env.PORT || 8080
    this.dbConn()
    this.app = express()
    this.app.set('base', '/api')
    this.middleware()
    this.routes()
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.info(`Server on ${this.port}`)
    })
  }

  private middleware(): void {
    this.app.use(helmet())
    this.app.use(express.json())
  }

  private routes(): void {
    this.app.use('/api/users', new UserRoutes().router)
    this.app.use('/api/store-categorys', new StoreCategoryRoutes().router)
    this.app.use('/api/store', new StoreRoutes().router)
  }

  private dbConn(): void {
    DBConnection.connection()
  }
}
