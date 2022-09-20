import express from 'express'

const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(port, () => {
  console.log(`account-book api server listening on port: ${port}`)
})

export default app
