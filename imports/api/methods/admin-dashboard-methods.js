import { Meteor } from "meteor/meteor";
import CompanyCollection from "../../../collections/company";
import Conversations from "../../../collections/messages/conversation";
import Messages from "../../../collections/messages/message";

const getClients = function () {
  return Meteor.users.find({ _id: { $ne: this.userId } }).fetch();
};

const getInfo = function () {
  return CompanyCollection.find({ userId: this.userId }).fetch();
};

const getUserInfo = async function () {
  return await Meteor.users
    .rawCollection()
    .aggregate([
      {
        $lookup: {
          from: "companies",
          localField: "_id",
          foreignField: "userId",
          as: "info",
        },
      },
    ])
    .toArray();
};

const deleteClient = (id) => {
  Meteor.users.remove(id);
};

const activateDesactivateCompany = (id) => {
  const user = Meteor.users.findOne({ _id: id });
  console.log(user);
  Meteor.users.update(id, { $set: { isActive: !(user.isActive ?? true) } });
  return Meteor.users.findOne({ _id: id })?.isActive;
};

const updateClient = async function (id, data) {
  console.log(id);
  // const client = Meteor.users.findOne(id);
  console.log(data);
  Meteor.users.update(id, {
    $set: {
      "profile.firstName": data,
    },
  });
};

const getCompanies = function ({
  page,
  itemsPerPage,
  search,
  sortBy = "_id",
  sortOrder = "asc",
}) {

  const query = { _id: { $ne: this.userId } };
  const options = {
    skip: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
    sort: {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    },
  };
  const totalCount = Meteor.users.find({ _id: { $ne: this.userId } }).count();
  if (search && search.length) {
    query.$or = [
      {
        fullName: {
          $regex: `.*${search}.*`,
          $options: "i",
        },
        _id: {
          $regex: `.*${search}.*`,
          $options: "i",
        },
      },
    ];
  }
  return { items: Meteor.users.find(query, options).fetch(), totalCount };
};

const sendAdminMsg = function ({ message, userId }) {
  if (!message || !message.trim().length)
    throw new Meteor.Error('sendAdminMsg', 'invalid info')

  let conversation = Conversations.findOne({
    participants: { $all: [userId, this.userId] }
  });
  if (!conversation) {
    conversation = Conversations.findOne(Conversations.insert({
      participants: [
        userId,
        this.userId
      ],
    }))
  }
  Messages.insert({
    conversationId: conversation._id,
    createdAt: new Date(),
    content: message,
    sender: this.userId
  })
}

const enrolledCoompanies = function () {
  return Meteor.users.find({ _id: { $ne: this.userId } }).count()
}


Meteor.methods({
  getClients,
  getInfo,
  getUserInfo,
  deleteClient,
  updateClient,
  getCompanies,
  activateDesactivateCompany,
  sendAdminMsg,
  enrolledCoompanies
});
