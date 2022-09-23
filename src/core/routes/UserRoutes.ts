import { Router } from 'express'
import UserController from '../../user/api/UserController'

const router = Router()
const controller = new UserController()

router
  .route('/')
  .get(controller.getList)
  .post((req, res) => {
    res.send('user post hihi')
  })

export default router
