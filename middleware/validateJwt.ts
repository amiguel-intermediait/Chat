import {Request, Response} from 'express';
import jwt from "jsonwebtoken"; 

import { getEnv } from '../helpers/getEnv';
import User from '../models/User';
import { JwtPayload } from '../interface/index'

export const validateJtw = async (req : Request, res : Response, next : any) =>{
    console.log('Validando token');
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg:"You don't have token"
        });
    }
    try {
        const { id } : JwtPayload = jwt.verify(token, getEnv("SECRETKEY", "SECRETKEY") ) as JwtPayload;
        const user = await User.findOne({where:{id: id}})
        if(!user){
            return res.status(401).json({
                msg:"User dosen't exist"
            });
        }
        req.user = user;
        req.id = id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}