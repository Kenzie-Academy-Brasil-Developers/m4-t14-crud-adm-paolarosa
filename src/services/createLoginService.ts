import { QueryConfig } from 'pg'
import { ILoginRequest } from '../interfaces/loginInterface'
import { IUserWithPassword } from '../interfaces/userInterface'
import { client } from '../database'
import { AppError } from '../errors'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'


const createLogin = async (loginData: ILoginRequest): Promise<string> => {

    const queryString: string = `
    SELECT *
    FROM users
    WHERE email = $1;`

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [loginData.email]
    }
    const queryResult: IUserWithPassword = await client.query(queryConfig)
    if (queryResult.rowCount === 0) {
        throw new AppError('Wrong emai/password!', 401)
    }
    const matchPassword: boolean = await compare(loginData.password, queryResult.rows[0].password)
    if (!matchPassword) {
        throw new AppError('Wrong emai/password!', 401)
    }
    if (queryResult.rows[0].active === false) {
        throw new AppError('Wrong emai/password!', 401)
    }

    const token: string = jwt.sign({
        role: queryResult.rows[0].admin

    },
        process.env.SECRET_KEY!, {
        expiresIn: '24h',
        subject: queryResult.rows[0].id.toString()
    })
    return token
}


export { createLogin }