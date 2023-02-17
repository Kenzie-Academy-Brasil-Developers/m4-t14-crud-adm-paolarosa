import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors'
import 'dotenv/config'

const ensureAdminIsValid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const userAuthenticated = req.user
    if (userAuthenticated.role === false) {
        throw new AppError('Insuficiente permission!', 403)
    }
    return next()
}

export { ensureAdminIsValid }