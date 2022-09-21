import { Router } from 'express'

const router = Router()

router
  .route('/')
  .get((req, res) => {
    res.send('user hihi')
  })
  .post((req, res) => {
    res.send('user post hihi')
  })

export default router
