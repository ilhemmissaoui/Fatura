import { LinksCollection } from "../../../collections/links";

Meteor.publish("linkPub", () => {
  return LinksCollection.find({ userId: this.userId });
});
