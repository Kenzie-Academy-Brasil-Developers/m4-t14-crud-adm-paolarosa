import { hashSync } from 'bcryptjs';
import { z } from 'zod';

const createUserSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().transform((pass)=>{
		return hashSync(pass,10)
	}),
	admin: z.boolean().optional().default(false),
    active: z.boolean().optional().default(true)
})
const returnUserSchema = createUserSchema.extend({
    id: z.number()
})
const returnWithoutPassword = returnUserSchema.omit({password: true})

const userGetSchema = returnWithoutPassword.array()
const allUsersSchema = z.array(returnWithoutPassword)

export { createUserSchema, returnUserSchema, returnWithoutPassword, userGetSchema, allUsersSchema }