import { Socket, Server as SocketServer } from "socket.io";
import { jwtValidator } from "../helpers/jwtGenerator";
import { ChatMessage } from "../models";

const chatMessage = new ChatMessage();
const socketsController = async (socket: Socket, io : SocketServer) =>{
    const user =  await jwtValidator(socket.handshake.headers['x-token']);
    if(!user){
        return socket.disconnect();
    }
    chatMessage.connectUser(user);
    io.emit('onlineUsers', chatMessage.onlineUsers);
    socket.emit('receiveMessages', chatMessage.last10 );

    socket.on('disconnect', () => {
        chatMessage.disconectUser( user.id );
        io.emit('onlineUsers', chatMessage.onlineUsers);
    })

    socket.on('sendMessage', ({ message }) => {
        chatMessage.sendMessage("1", user.user_name, message );
        io.emit('receiveMessages', chatMessage.last10 );
    })
}

export default socketsController;