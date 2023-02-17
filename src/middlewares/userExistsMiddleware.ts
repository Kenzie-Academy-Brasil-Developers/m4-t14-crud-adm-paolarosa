import { Request, Response, NextFunction } from 'express'
import { QueryConfig } from 'pg'
import { client } from '../database'

const ensureUserpExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const userId: number = parseInt(req.params.id)
    const queryString: string = `
    SELECT COUNT(*)
    FROM users
    WHERE id = $1;
    `
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }

    const queryResult = await client.query(queryConfig)
    if (Number(queryResult.rows[0].count) > 0) {
        return next()
    }
    return res.status(404).json({ message: `User not found.` })
}

export { ensureUserpExists }