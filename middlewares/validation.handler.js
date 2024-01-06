import { boom } from '@hapi/boom'

export function validatorHandrer (schema, property) {
  return (req, res, next) => {
    const data = req[property]
    const { error } = schema.validate(data, { abortEarly: false }) // para que muestre todos los errores de una
    if (error) {
      next(boom.badRequest(error))
    }
    next()
  }
}
