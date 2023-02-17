import { createLoginSchema } from '../schemas/login.schema'
import { z } from 'zod'

type ILoginRequest = z.infer<typeof createLoginSchema>

export { ILoginRequest}