import { LinksCollection } from "../../../collections/links";
import { COMPANY } from "../roles";
import { Meteor } from "meteor/meteor";

const userRegister = function (data) {
  const info = {
    email: data.email,
    password: data.password,
    profile: {
      firstName: data.firstName,
      lastName: data.lastName,
    },
  };
  const _id = Accounts.createUser(info); /// create a user account
  Roles.addUsersToRoles(_id, COMPANY); /// give the created user a CLIENT role
  return _id;
};

const myMethode = () => {
  console.log("me");
};

const updatelinks = async function (id, data) {
  console.log(data);
  const link = LinksCollection.findOne(id);
  console.log(link);
  // if (!LinksCollection) {
  // throw new Meteor.Error("Link not found");
  //}
  //try {
  //  await LinkSchema.validate(url);
  //} catch (e) {
  //  throw new Meteor.Error(e.message);
  // }
  LinksCollection.update(
    { _id: id },
    {
      $set: {
        url: data,
      },
    }
  );
};

const deleteLinks = (data) => {
  LinksCollection.remove(data);
  console.log(data);
};
const addlinks = async function (data) {
  console.log(data);
  //try {
  // await LinkSchema.validate(url);
  // } catch (e) {
  //  throw new Meteor.Error(e.message);
  //}
  //if (this.userId)

  // if (!this.userId) {
  //  throw new Meteor.Error("not-authorized");
  // }

  LinksCollection.insert({
    ...data,
    userId: this.user,
  });
};

Meteor.methods({
  userRegister,
  myMethode,
  addlinks,
  deleteLinks,
  updatelinks,
});
