export default Messages = new Mongo.Collection("message");


// {
//     id:String,
//     conversation_id:String,
//     sender:String,
//     content:String,
//     read_by:[String] //user ids
//     deleted_by:[String]
//     ...
//    }