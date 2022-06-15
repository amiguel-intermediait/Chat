export class Message{
    private id : string;
    private user_name : string;
    private text : string;
   
    constructor(id : string, user_name : string, text : string){
        this.id = id;
        this.user_name = user_name;
        this.text = text;
    }
}