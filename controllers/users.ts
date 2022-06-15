import {Request, Response} from 'express';
import User from '../models/User';

export const getUsers = async (req : Request, res : Response) => {
    console.log('Get Users')
    try {
        const users = await User.findAll();
        res.json({users});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Server error"
        })
    }
    
    

}

export const getUser = async (req : Request, res : Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if(user){
            res.json({
                user
            })        
        }else{
            res.status(404).json({
                msg: "Ese usuario no existe"
            })
        }
    } catch (error) {
        res.status(500).json({
            msg:"Server error"
        })
    }

}

export const postUser = async (req : Request, res : Response) => {
    
    const { user_name, email, status } = req.body;
    try {
        const newUser = await User.create({
            user_name: user_name,
            email: email,
            status: status
        });
        res.json({
            newUser
        })
    } catch (error) {
        res.status(500).json({
            msg:"Server error"
        })
    }
}

export const putUser = async (req : Request, res : Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({msg: "No existe ese usuario"})
        }
        
        await user.update(body)
        
        res.json({
            user
        })
    } catch (error) {
        res.status(500).json({
            msg:"Server error"
        })
    }


}

export const deleteUser = async (req : Request, res : Response) => {
    
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if(!user){
            res.status(404).json({
                msg: 'No existe ese usuario',
            })        
        }
        await user.destroy();
        res.json({
            msg: 'deleteUser',
        })
    } catch (error) {
        res.json({
            msg: 'Server error',
        })        
    }
}