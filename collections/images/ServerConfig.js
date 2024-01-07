import gfs from "../../imports/api/gridFs";
import fs from 'fs';

export default {
    onBeforeUpload(file) {
        if (file.size <= 60 * 1024 * 1024 && /png|jpeg|jpg|pdf|mp3|/i.test(file.extension))
            return true;
        return 'Please upload file, with size equal or less than 60MB';
    },
    interceptDownload(http, file, versionName) {
        const _id = (file.versions[versionName].meta || {}).gridFsFileId;
        if (_id) {
            const readStream = gfs.createReadStream({ _id });
            readStream.on('error', err => { throw err; });
            readStream.pipe(http.response);
        }
        return Boolean(_id);
    },
    onAfterRemove(files) {
        files.forEach(file => {
            Object.keys(file.versions).forEach(versionName => {
                const _id = (file.versions[versionName].meta || {}).gridFsFileId;
                if (_id) gfs.remove({ _id }, err => { if (err) throw err; });
            });
        });
    },
    onAfterUpload(image) {
        Object.keys(image.versions).forEach(versionName => {
            const metadata = { versionName, imageId: image._id, storedAt: new Date() };
            const writeStream = gfs.createWriteStream({ filename: image.name, metadata });
            fs.createReadStream(image.versions[versionName].path).pipe(writeStream);
            writeStream.on('close', Meteor.bindEnvironment(file => {
                const property = `versions.${versionName}.meta.gridFsFileId`;
                this.collection.update(image._id, { $set: { [property]: file._id.toString() } });
                this.unlink(this.collection.findOne(image._id), versionName);
            }));
        });
    }
}