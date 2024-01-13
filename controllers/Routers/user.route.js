import { Router } from 'express'
import { getUser, postUser } from '../user.controller.js'
import { CreateUserSchema } from '../../models/user.model.js'
import { validatorHandler } from '../../middlewares/validator.handler.js'
export const user = Router()

user.get('/', getUser)
user.post('/', validatorHandler(CreateUserSchema, 'body'), postUser)
