import { queryAsync } from './connection.controller.js'
import boom from '@hapi/boom'
const createUser = async (content, res, next) => {
  try {
    const result = await queryAsync(
      'INSERT INTO user2(username, password, birthdate, email) VALUES (?,?,?,?)',
      [content.username, content.password, content.birthdate || null, content.email]
    )
    return result
  } catch (error) {
    next(error)
  }
}

const readUser = async (content, req, res, next) => {
  try {
    const result = await queryAsync(
      'SELECT * FROM user'
    )
    if (result.length !== 0) {
      return result
    } else {
      return false
    }
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (id, req, res, next) => {
  try {
    const result = await queryAsync(
      'DELETE FROM user WHERE ID = ? ', [id]
    )
    if (result.affectedRows !== 0) {
      return true
    } else {
      return false
    }
  } catch (error) {
    next(error)
  }
}

// const updateUser = async (content, req, res, next) =>{
//   try {
//     await queryAsync(
//       ''
//     )
//   } catch (error) {

//   }
// }

// ROUTERS

export async function getUser (req, res, next) {
  try {
    const users = await readUser()
    if (users) {
      res.status(200).json({ users })
    } else {
      next(Boom.noContent('No hay  usuarios registrados en la base de datos'))
    }
  } catch (error) {
    next(error)
  }
}

export async function postUser (req, res, next) {
  try {
    const content = await createUser(req.body, res, next)
    if (content.affectedRows) {
      res.status(200).json({ response: 'Se ha creado con exito' })
    }
  } catch (error) {
    next(error)
  }
}
