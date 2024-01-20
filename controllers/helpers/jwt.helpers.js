// jose, dotenv, passport, passport-http-bearer
import dotenv from 'dotenv'
import passport from 'passport'
import { SignJWT, jwtVerify } from 'jose'
import { Strategy as BearerStrategy } from 'passport-http-bearer'

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

export async function validateToken (req, res, next) {
  try {
    const encoder = new TextEncoder()
    const { payload } = await jwtVerify(
      req.headers.authorization.split(' ')[1],
      encoder.encode(process.env.JWT_KEY)
    )
    if (payload.role === 'admin' || payload.role === 'student') {
      req.user = payload
      return next()
    } else {
      res.status(404).json({ status: 404, message: 'Not Found' })
    }
  } catch (err) {
    console.error(err)
    return res.status(400).json({ status: 401, message: 'Unauthorized' })
  }
}

export async function createToken (req, res) {
  const encoder = new TextEncoder()
  if (req.body.role === 'admin' || req.body.role === 'student') {
    const jwtConstructor = await new SignJWT(req.body)
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(encoder.encode(process.env.JWT_KEY))
    res.status(200).json({ status: 200, token: jwtConstructor })
  } else {
    res.status(400).json({ status: 400, message: 'Invalid Credentials required' })
  }
}
