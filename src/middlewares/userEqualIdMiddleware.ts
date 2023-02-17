import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors'
import 'dotenv/config'

const userEqualId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.user.id !== +req.params.id && !req.user.role) {
        throw new AppError('Insuficiente permission!', 403)
    }
    return next()
}

export { userEqualId }