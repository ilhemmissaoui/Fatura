import { Meteor } from 'meteor/meteor';
import { SUPER_ADMIN } from '../../api/roles';


/// everytime the server started he will create the admin
/// if we dont have any user so the admin will be created automatically

Meteor.startup(function () {
    if (!Meteor.users.find().count()) {
        const obj = {
            email: 'admin@mail.com',
            password: 'password',
            profile: {
                name: 'Ilhem'
            },
            isActive: true
        };
        const _id = Accounts.createUser(obj);
        Meteor.users.update(_id, {
            $set: {
                'emails.0.verified': true
            }
        });

        Roles.addUsersToRoles(_id, SUPER_ADMIN);
    }
});
