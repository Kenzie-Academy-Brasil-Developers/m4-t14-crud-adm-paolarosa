import { QueryResult } from 'pg'
import { allUsersSchema, createUserSchema, returnUserSchema, returnWithoutPassword, userGetSchema } from '../schemas/schemas'
import { z } from 'zod'

type IUserRequest = z.infer<typeof createUserSchema>
type IUser = z.infer<typeof returnUserSchema>

type IAllUsersReturn = z.infer<typeof allUsersSchema>

type IUserPass = z.infer<typeof userGetSchema>

type IUserWithoutPassword = Omit<IUser, 'password'>
type IUserWithPassword = QueryResult<IUser>

type IUserResult = QueryResult<IUserWithoutPassword>

export {
    IUserRequest,
    IUser,
    IUserWithoutPassword,
    IUserResult,
    IUserWithPassword,
    IAllUsersReturn,
    IUserPass
}