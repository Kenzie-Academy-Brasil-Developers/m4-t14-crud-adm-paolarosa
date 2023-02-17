import { Request, Response } from 'express'
import createUsersService from '../services/createUserService'
import { IUserRequest } from '../interfaces/userInterface'
import { deleteUser } from '../services/deleteService'
import { getAllUsers } from '../services/getUsersService'
import { createLogin } from '../services/createLoginService'
import { getLoginUser } from '../services/getLogUsersService'
import { updateUserService } from '../services/updateUserService'
import { activeUserService } from '../services/activeUserService'

const createUsersController = async (req: Request, res: Response): Promise<Response> => {
    const userData: IUserRequest = req.body
    const newUser = await createUsersService(userData)
    return res.status(201).json(newUser)
}

const deleteSoft = async (req: Request, res: Response): Promise<Response> => {
    const userId: number = parseInt(req.params.id)
    await deleteUser(userId)
    return res.status(204).send()
}

const getUserController = async (req: Request, res: Response): Promise<Response> => {
    const user = await getAllUsers()
    return res.json(user)
}

const createLoginController = async (req: Request, res: Response): Promise<Response> => {
    const token = await createLogin(req.body)
    return res.json({
        token: token
    })
}

const getUserLoged = async (req: Request, res: Response): Promise<Response> => {
    const user = await getLoginUser(req.body, req)
    return res.json(user)
}

const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const userId: number = parseInt(req.params.id)
    const update = await updateUserService(req.body, userId)
    return res.json(update)
}

const activeUser = async (req: Request, res: Response): Promise<Response> => {
    const userId: number = parseInt(req.params.id)
    const active = await activeUserService(req.body, userId)
    return res.json(active)
}

export {
    createUsersController, deleteSoft, getUserController, createLoginController, getUserLoged, updateUser,
    activeUser
}