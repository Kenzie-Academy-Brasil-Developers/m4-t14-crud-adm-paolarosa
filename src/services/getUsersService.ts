import { client } from '../database'
import { QueryConfig } from 'pg'
import { IAllUsersReturn } from '../interfaces/userInterface'
import { allUsersSchema } from '../schemas/schemas'

const getAllUsers = async (): Promise<IAllUsersReturn> => {

    const queryString: string = `
    SELECT *
    FROM users;`

    const queryConfigUser: QueryConfig = {
        text: queryString
    }
    const queryResultUser = await client.query(queryConfigUser)
    const allUsers = allUsersSchema.parse(queryResultUser.rows)
    return allUsers
}

export { getAllUsers }