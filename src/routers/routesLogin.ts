import { Router } from 'express'
import { createLoginController } from '../controllers/controllers'
import { ensureDataIsValid } from '../middlewares/dataIsValidMiddleware'
import { createLoginSchema } from '../schemas/login.schema'


const loginRoutes: Router = Router()

loginRoutes.post('',ensureDataIsValid(createLoginSchema), createLoginController )

export {loginRoutes}