import { Router } from "express";
import { getAllUsers, getUser } from "../controller/userControler";
// import authorize from '../middlewares/auth.middleware.js'
const userRoutes = Router()

userRoutes.get('/', getAllUsers);

userRoutes.get('/:id', getUser);

userRoutes.post('/', (req, res) => res.send({ title: 'CREATE new user' }));

userRoutes.put('/:id', (req, res) => res.send({ title: 'UPDATE user' }));

userRoutes.delete('/:id', (req, res) => res.send({ title: 'DELETE user' }));

export default userRoutes