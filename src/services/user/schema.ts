import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: {
            firstName: String,
            lastName: String
        }
    },
    email: String,
    phoneNumber: String,
    gender: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('Users', schema);