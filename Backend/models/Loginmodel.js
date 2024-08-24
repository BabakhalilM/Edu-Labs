import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        default: "user",
        enum:["admin","user"],
    }
});
const Users = mongoose.model('Users', userSchema);

export default Users;
