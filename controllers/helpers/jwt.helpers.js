// jose, dotenv, passport, passport-http-bearer
import dotenv from 'dotenv'
import passport from 'passport'
import { SignJWT, jwtVerify } from 'jose'
import { strategy as BearerStrategy } from 'passport-http-bearer'

// llamar variables de entorno
dotenv.config('../')
console.log(process.env.JWT_KEY)

// configurar la estrategia de autenticacion Bearer

passport.use(// verfica si hay un token en el encabezado de autorizacion, si esta, lo toma y utiliza la estrategia bearer para verificar su validez
  new BearerStrategy( // se encarga de verificar el token en la peticion http de autorizacion y devolver un estado
    async (Token, done) => {
      try {
        const encoder = TextEncoder() // Es una interfaz que convirte una cadena de caracteres en un su representacion binaria (Uint8Array)
        const { payload } = await jwtVerify(Token, encoder.encode(process.jwtVerify))
        return done(null, payload)
      } catch (error) {
        return done(error, false)
      }
    }
  )
)

export function requireRole (role) {
  return (req, res, next) => {
    passport.authenticate(
      'BEARER', { session: false }, (err, user) => {
        if (err) {
          return res.status(401).json({ status: 401, message: 'Unauthorized' })
        } if (!user) {
          return res.status(401).json({ status: 401, message: 'Unauthorized' })
        } if (user.role !== role) {
          return res.status(403).json({ status: 403, message: 'Forbiden' })
        }
        req.user = user
        next()
      }
    )(req, res, next)
  }
}

