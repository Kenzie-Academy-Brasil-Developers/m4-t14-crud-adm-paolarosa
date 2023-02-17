import { client } from '../database'
import format from 'pg-format'
import { IUserRequest, IUserResult, IUserWithoutPassword } from '../interfaces/userInterface'
import { QueryConfig } from 'pg'
import { AppError } from '../errors'

const createUsersService = async (userData: IUserRequest): Promise<IUserWithoutPassword> => {

    const queryStringUserExist: string = `
    SELECT *
    FROM users
    WHERE email = $1;`

    const queryConfigUserExist: QueryConfig = {
        text: queryStringUserExist,
        values: [userData.email]
    }
    const queryResultUserExists = await client.query(queryConfigUserExist)
    if (queryResultUserExists.rowCount > 0) {
        throw new AppError('E-mail already registered', 409)
    }
    const queryString: string = format(
        `
            INSERT INTO
                users(%I)
            VALUES(%L)
            RETURNING id, name, email, admin, active;
        `,
        Object.keys(userData),
        Object.values(userData)
    )

    const queryResult: IUserResult = await client.query(queryString)
    return queryResult.rows[0]
}

export default createUsersService