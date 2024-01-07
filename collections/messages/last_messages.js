import { Mongo } from "meteor/mongo";

const LastMessages = new Mongo.Collection('lastMessages');
export default LastMessages;