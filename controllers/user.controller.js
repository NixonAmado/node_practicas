import { readUser, createUser, deleteUser } from './generic.controller.js'

// ROUTERS

export async function getUser (req, res, next) {
  try {
    const users = await readUser('User', req, res, next)
    if (users) {
      res.status(200).json({ users })
    } else {
      res.status(204).json({ Message: 'No hay usuarios registrados' })
    }
  } catch (error) {
    next(error)
  }
}

export async function postUser (req, res, next) {
  try {
    const content = {
      table: 'User',
      attributes: 'username,password,birthdate,email',
      values: [req.body.username, req.body.password, req.body.birthdate || null, req.body.email]
    }
    content.length = '?,'.repeat(content.values.length).slice(0, -1)
    const response = await createUser(content, res, next)
    if (response !== undefined && response.affectedRows > 0) {
      res.status(200).json({ response: 'Se ha creado con exito' })
    }
  } catch (error) {
    next(error)
  }
}

export async function delUser (req, res, next) {
  try {
    const { id } = req.params
    const content = {
      table: 'User',
      id
    }
    const response = await deleteUser(content, res, next)
    if (response !== undefined && response.affectedRows > 0) {
      res.status(200).json({ message: 'Usuario eliminado correctamente' })
    }
  } catch (error) {
    next(error)
  }
}
