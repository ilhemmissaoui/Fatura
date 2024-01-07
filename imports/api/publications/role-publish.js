import { Meteor } from 'meteor/meteor';

Meteor.publish(null, function () {
    if (this.userId) {
        return Meteor.roleAssignment.find();
    } else {
        this.ready()
    }
})