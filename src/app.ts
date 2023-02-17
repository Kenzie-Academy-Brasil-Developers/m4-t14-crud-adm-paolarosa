import 'express-async-errors'
import express, { Application } from 'express'
import userRoutes from './routers/routesUsers'
import { handleErrors } from './errors'
import { loginRoutes } from './routers/routesLogin'

const app: Application = express()

app.use(express.json())

app.use('/users', userRoutes)
app.use('/login',loginRoutes)

app.use(handleErrors)

export default app