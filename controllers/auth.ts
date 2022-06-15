import {Request, Response} from 'express';
import User from "../models/User"
import { jwtGenerator } from '../helpers/jwtGenerator';

export const login = async (req : Request, res : Response)=>{
    const {email} = req.body;
    try {
        const user = await User.findOne({where:{email: email}});
        if(!user){
                return res.status(400).json({
                    msg:"Dosen't exist"
                })  
        }
        const token = await jwtGenerator(user.id);
        res.json({
            token
        })        
    } catch (error) {
        res.status(403).json({
            msg:"Dosen't exist"
        })
    }
}

export const renewToken = async (req: Request, res: Response) =>{
    const token = await jwtGenerator(req.id);
    res.json({
        'token' : token,
        'user' : req.user
    })        
}
