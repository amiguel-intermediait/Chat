import jwt from 'jsonwebtoken';
import { getEnv } from '../helpers/getEnv'
import { JwtPayload } from '../interface/index'
import User from '../models/User';

export const jwtGenerator = async( id: string) =>{
    return new Promise((resolve, rejected) =>{
        const payload = {id};
        jwt.sign(payload, getEnv("SECRETKEY", "SECRETKEY" ),{
            expiresIn:'4h'
        }, (error, token) => {
            if(error){
                rejected("Token couldn't be created")
            }else{
                resolve(token);
            }
        })
    })
}

export const jwtValidator = async( token : any) => {
    try {
        if(  token.length < 10 ) {
            return null;
        }
        const { id } = jwt.verify( token, getEnv("SECRETKEY", "SECRETKEY" ) ) as JwtPayload;
        const user = await User.findOne({where:{id: id}})

        if ( user ) {
                return user;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }

}