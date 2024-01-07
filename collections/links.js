import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import links from "../collections/links";

export const LinksCollection = new Mongo.Collection("links");
