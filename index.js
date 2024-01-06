import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express()
// config
dotenv.config()
app.set('port', process.env.PORT || 8080)
// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({ origin: '*' }))
// Routes
app.get('/', (req, res) => {
  res.send('hola mundo')
})
// Listen
app.listen(app.get('port'), () => {
  console.log('my local host = http://localhost:' + app.get('port'))
})
