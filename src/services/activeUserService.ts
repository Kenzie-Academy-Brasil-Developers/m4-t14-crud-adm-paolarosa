import { QueryConfig } from "pg"
import { client } from "../database"
import { AppError } from "../errors"
import { IUser, IUserPass, IUserResult, IUserWithoutPassword } from "../interfaces/userInterface"
import { userGetSchema } from "../schemas/schemas"

const activeUserService = async (userData: IUser, userId: number): Promise<IUserWithoutPassword> => {

  const queryAlredyExists: string = `
  SELECT * FROM users
  WHERE id = $1;`
  const queryConfigExists: QueryConfig = {
    text: queryAlredyExists,
    values: [userId]
  }
  const queryResultExists: IUserResult = await client.query(queryConfigExists);
  const validate = queryResultExists.rows.find((el) => {
    return el.active === true;
  });
  if (validate) {
    throw new AppError('User already active', 400)
  }
  const queryString: string = `
    UPDATE users
    SET "active" = true
    WHERE id = $1
    RETURNING *;`

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId] 
  }

  const queryResultUpdate: IUserResult = await client.query(queryConfig)
  const users = userGetSchema.parse(queryResultUpdate.rows)
  return users[0]
}

export { activeUserService }