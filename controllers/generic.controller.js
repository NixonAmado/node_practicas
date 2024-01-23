import { queryAsync } from './connection.controller.js'
import boom from '@hapi/boom'
export const createUser = async (content, res, next) => {
  try {
    const result = await queryAsync(
      `INSERT INTO ${content.table}(${content.attributes}) VALUES (${content.length})`,
      content.values
    )
    return result
  } catch (error) {
    next(error)
  }
}

export const readUser = async (table, req, res, next) => {
  try {
    const result = await queryAsync(
      `SELECT * FROM ${table}`
    )
    if (result.length !== 0) {
      return result
    }
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (content, res, next) => {
  try {
    const result = await queryAsync(
      `DELETE FROM ${content.table} WHERE ID = ? `, [content.id]
    )
    return result
  } catch (error) {
    next(error)
  }
}

// const updateUser = async (content, req, res, next) =>{
//   try {
//     const GetUser = await queryAsync(
//       `SELECT * FROM ${content.table} `
//     )

//   } catch (error) {

//   }
// }
