import { QueryConfig } from 'pg'
import { ILoginRequest } from '../interfaces/loginInterface'
import { IAllUsersReturn } from '../interfaces/userInterface'
import { client } from '../database'
import { Request } from "express"
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { allUsersSchema } from '../schemas/schemas'


const getLoginUser = async (loginData: ILoginRequest, req: Request): Promise<IAllUsersReturn> => {
    let token = req.headers.authorization
    token = token!.split(' ')[1]
    const tokenTalen = jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
        req.user = {
            id: parseInt(decoded.sub),
            role: decoded.role
        }
        return req.user.id
    })

    const queryString: string = `
    SELECT *
    FROM users
    WHERE id = $1;`

    const queryConfigUser: QueryConfig = {
        text: queryString,
        values: [tokenTalen]
    }
    const queryResultUser = await client.query(queryConfigUser)
    const allUsers = allUsersSchema.parse(queryResultUser.rows)
    return allUsers
}


export { getLoginUser }