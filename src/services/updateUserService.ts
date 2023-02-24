import { client } from '../database'
import format from 'pg-format'
import { IUser, IUserResult, IUserWithoutPassword } from '../interfaces/userInterface'
import { QueryConfig } from 'pg'
import { AppError } from '../errors'

const updateUserService = async (userData: IUser, userId: number): Promise<IUserWithoutPassword> => {

  const updateColumns: any[] = Object.keys(userData);
  const updateValues: any[] = Object.values(userData);

  const queryAlredyExists: string = `
  SELECT * FROM users;`;
  const queryResultExists = await client.query(queryAlredyExists);
  const validate = queryResultExists.rows.find((el) => {
    return el.email === userData.email;

  });
  if (validate) {
    throw new AppError('E-mail already registered', 409)
  }
  const queryStringUpdate: string = `
        UPDATE users
        SET   (%I) = ROW(%L)
        WHERE id   = $1
        RETURNING id, name, email, admin, active;
        `
  const queryFormat: string = format(
    queryStringUpdate,
    updateColumns,
    updateValues
  );
  const queryConfig: QueryConfig = {
    text: queryFormat,
    values: [userId],
  };

  const queryResultUpdate: IUserResult = await client.query(queryConfig)
  return queryResultUpdate.rows[0]
}

export { updateUserService }