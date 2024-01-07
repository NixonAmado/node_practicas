import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import { boomErrorHandler, errorHandler, logErrors } from './middlewares/error.handler.js'
import { user } from './controllers/Routers/user.route.js'
const app = express()
// config
dotenv.config()
app.set('port', process.env.PORT || 8080)
// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({ origin: '*' }))
app.use(logErrors)
app.use(boomErrorHandler)

app.use(errorHandler)
// Routes
app.get('/', (req, res) => {
  res.send('hola mundo')
})
app.use('/user', user)
// Listen
app.listen(app.get('port'), () => {
  console.log('my local host = http://localhost:' + app.get('port'))
})
