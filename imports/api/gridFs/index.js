import Grid from 'gridfs-stream';
import { MongoInternals } from 'meteor/mongo';

const gfs = Grid(
    MongoInternals.defaultRemoteCollectionDriver().mongo.db,
    MongoInternals.NpmModule
);
export default gfs;