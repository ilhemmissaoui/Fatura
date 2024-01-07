import "../imports/startup/server/create-admin";
import "../imports/startup/server/create-roles";
import "../imports/api";
import { LinksCollection } from "../collections/links";
import { Images } from '../collections/images/';
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { WebApp } from "meteor/webapp";

Accounts.validateNewUser((user) => {
  console.log("this the user", user);
  return true;
});

Accounts.validateLoginAttempt(function (attemptObj) {
  if (typeof attemptObj.user?.isActive !== "undefined" && !attemptObj.user?.isActive)
    throw new Meteor.Error(405, "Your account is inactive. Please contact our support department.");
  return true;
});

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = LinksCollection.findOne({ _id });
    if (link) {
      res.statusCode = 302;
      res.setHeader("Location", link.url);
      res.end();
    } else {
      next();
    }
  });
});
