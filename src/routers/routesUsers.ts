import { Router } from 'express'
import { activeUser, createUsersController, deleteSoft, getUserController, getUserLoged, updateUser } from '../controllers/controllers'
import { createUserSchema } from '../schemas/schemas'
import { ensureDataIsValid } from "../middlewares/dataIsValidMiddleware"
import { ensureTokenIsValid } from '../middlewares/tokenIsValidMiddleware'
import { ensureAdminIsValid } from '../middlewares/adminIsValidMiddleware'
import { ensureUserpExists  } from '../middlewares/userExistsMiddleware'
import { userEqualId } from '../middlewares/userEqualIdMiddleware'


const userRoutes: Router = Router()

userRoutes.post('', ensureDataIsValid(createUserSchema), createUsersController)
userRoutes.get('', ensureTokenIsValid, ensureAdminIsValid, getUserController)
userRoutes.patch('/:id', ensureTokenIsValid, userEqualId, ensureUserpExists, updateUser)
userRoutes.delete('/:id', ensureTokenIsValid, ensureUserpExists, deleteSoft)
userRoutes.get('/profile', ensureTokenIsValid, getUserLoged)
userRoutes.put('/:id/recover', ensureTokenIsValid, ensureAdminIsValid, ensureUserpExists, activeUser)

export default userRoutes