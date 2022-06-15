import dotenv from 'dotenv';
dotenv.config();

export const getEnv = (evnName : string, fallBack : string) : string =>{
    const envValue = process.env.envName
    if(envValue){
        return envValue;
    }
    if(fallBack !== undefined){
        return fallBack;
    }
    throw(new Error(`${evnName} dosen't exist`));
}