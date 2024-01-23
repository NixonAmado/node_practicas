import Joi from 'joi'

const name = Joi.string().alphanum().min(3).max(50)
const id = Joi.number().integer().positive()
const birthdate = Joi.date()
  .format('iso')
  .min(new Date().getFullYear() - 99 + '-01-01') // minimo
  .max((new Date().getFullYear() - 18) + '-01-01') // maximo

const email = Joi.string().email().max(60)
const password = Joi.string()
  .min(7)
  .max(255)
  .regex(/(?=.*[A-Z])(?=.*[0-9])/)
  .messages({ 'string.pattern.base': 'La contraseña debe tener por lo menos una letra mayúscula y un número' })

export const CreateUserSchema = Joi.object({
  username: name.required(),
  birthdate,
  email: email.required(),
  password: password.required()
})

export const GenericIdUserSchema = Joi.object({
  id: id.required()
})
