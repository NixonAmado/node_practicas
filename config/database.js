import mysql from 'mysql2'
import dotenv from 'dotenv'

// importar variables de entorno
dotenv.config('../')

// conexion con base de datos

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
}

const db = mysql.createConnection(dbConfig)

db.connect((err, req, res) => {
  if (err) {
    console.log(err)
    console.error('Fallo al conectar con la base de datos')
  } else {
    console.log('conexion exitosa')
  }
})

export function QueryAsync (sql, options) {
  return new Promise(
    (resolve, reject) => {
      db.query(sql, options, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    }
  )
}
