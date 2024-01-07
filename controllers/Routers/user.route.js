import { Router } from 'express'
import { getUser, postUser } from '../user.controller.js'
export const user = Router()

user.get('/', getUser)
user.post('/', postUser)
