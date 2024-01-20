import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import { createToken, validateToken } from './controllers/helpers/jwt.helpers.js'
import { boomErrorHandler, errorHandler, logErrors } from './middlewares/error.handler.js'
import { user } from './controllers/Routers/user.route.js'
const app = express()
// config
dotenv.config()
app.set('port', process.env.PORT || 8080)
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('hola mundo')
})
app.get('/token', createToken)

app.use('/user', validateToken, user)
// Middlewares
app.use(morgan('dev'))
app.use(cors({ origin: '*' }))

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)
// Listen
app.listen(app.get('port'), () => {
  console.log('my local host = http://localhost:' + app.get('port'))
})
