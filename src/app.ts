import express, { Application } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
// DB 연결
import DBConnection from './core/db/DBConnection'
import helmet from 'helmet'
// router
import UserRoutes from './core/routes/UserRoutes'
import StoreCategoryRoutes from './core/routes/StoreCategoryRoutes'
import StoreRoutes from './core/routes/StoreRoutes'
import IncomeRoutes from './core/routes/IncomeRoutes'
import ExpenditureRoutes from './core/routes/ExpenditureRoutes'
import RTKRoutes from './core/routes/RTKRoutes'

dotenv.config()

export class App {
  private app: Application
  private port: number | string

  constructor() {
    this.port = process.env.PORT || 8080
    this.dbConn()
    this.app = express()
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
    this.app.use(cookieParser())
  }

  private routes(): void {
    this.app.use('/api/user', new UserRoutes().router)
    this.app.use('/api/store-category', new StoreCategoryRoutes().router)
    this.app.use('/api/store', new StoreRoutes().router)
    this.app.use('/api/income', new IncomeRoutes().router)
    this.app.use('/api/expenditure', new ExpenditureRoutes().router)
    this.app.use('/api/refresh', new RTKRoutes().router)
  }

  private dbConn(): void {
    DBConnection.connection()
  }
}
