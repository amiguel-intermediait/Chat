import express, { Application } from 'express';
import cors from 'cors';
import { createServer, Server as ServerHttp } from 'http';
import { Server as SocketServer, Socket  } from "socket.io";

import socketController from '../controllers/socketController';
import userRouter from '../routes/user';
import authRouter from '../routes/auth';
import { getEnv } from '../helpers/getEnv';
import { db } from '../db/connection';
import User from './User'

declare global {
    namespace Express {
      interface Request {
        id: string;
        user: User;
      }
    }
  }

class Server{
    private app: Application; 
    private port: string;
    private serverHttp : ServerHttp;
    private io : any;
    private paths = {
        auth: '/api/auth',
        users: '/api/users'
    } 
    
    constructor(){
        this.app = express();
        this.dbConnection();
        this.port = getEnv("port", '8080');
        this.serverHttp = createServer(this.app);
        this.io = new SocketServer(this.serverHttp);
        this.middlewares();
        this.routes();
        this.sockets();
    }
    

    async dbConnection(){
        try {
            await db.authenticate();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.paths.users, userRouter);
        this.app.use(this.paths.auth, authRouter);
    }

    sockets(){
        this.io.on("connection", (socket : Socket) => socketController( socket ,this.io));
    }

    listen(){
        this.serverHttp.listen(this.port, () => {
            console.log('Server Up')
        })
    }
}

export default Server;