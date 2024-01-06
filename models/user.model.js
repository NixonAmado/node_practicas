import Joi from 'joi'

const username = Joi.string().alphanum().min(3).max(30)
const id = Joi.number().integer().positive()
const birthdate = Joi.date()
  .format('iso')
  .min(new Date().getFullYear() - 18 + '-01-01') // maximo
  .max((new Date().getFullYear() - 99) + '-01-01')

const email = Joi.string().email()
const password = Joi.string()
  .min(7)
  .max(255)
  .regex('/(?=.*[A-Z])(?=.*[0-9])/')
  .error(new Error('La contraseña debe tener por lo menos una letra mayúscula y un número'))

export const CreateUserSchema = Joi.object({
  name: username.required(),
  birthdate: birthdate(),
  email: email.required(),
  password: password.required()
})

export const GenericIdUserSchema = Joi.object({
  id: id.required()
})
