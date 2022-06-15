import User from '../models/User'
import { Message } from './Message';

export class ChatMessage{

    private messages : Message[];
    private users : User[];

        constructor(){
            this.messages = [];
            this.users = [];
        }

        get last10(){
            this.messages = this.messages.splice(0,10);
            return this.messages;
        }

        get onlineUsers(){
            return Object.values( this.users );
        }

        sendMessage(id : string, user_name : string, text : string){
            this.messages.unshift(
                new Message(id, user_name, text)
            )
        }

        connectUser( user : User){
            this.users.push(user);
        }

        disconectUser(id : String){
            let count = 0;
            this.users.forEach(User => {
                if(User.id == id){
                    this.users.splice(count,1);
                }
                count++;  
            });
        }

        
    
}