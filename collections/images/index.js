import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

let config = {
    debug: false,
    collectionName: 'images',
    allowClientCode: false,
};
if (Meteor.isServer) {
    config = {...config,...require('./ServerConfig').default};
}
const Images = new FilesCollection(config);
if(Meteor.isServer)
    Images.denyClient();
export default Images;