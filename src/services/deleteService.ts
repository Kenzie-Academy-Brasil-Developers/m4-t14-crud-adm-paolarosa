import { QueryConfig, QueryResult } from 'pg'
import { client } from '../database'
import { AppError } from '../errors'

const deleteUser = async (userId: number): Promise<void> => {

    const queryStringUserExists: string = `
    SELECT *
    FROM users
    WHERE id= $1;`

    const queryConfigUserExist: QueryConfig = {
        text: queryStringUserExists,
        values: [userId]
    }
    const queryResult: QueryResult = await client.query(queryConfigUserExist)
    if (queryResult.rowCount === 0) {
        throw new AppError('User not found', 404)
    }
    const queryString: string = `
    UPDATE users
    SET "active" = false
    WHERE id = $1;`

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }
    await client.query(queryConfig)
}

export { deleteUser }