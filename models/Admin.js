

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, min: 2, max: 50, required: true },
    email: { type: String, min: 5, max: 50, required: true, unique: true },
    password: { type: String, required: true },
    photoUrl: { type: String, default: '' },
    cart: { type: Object, default: '' },
    order: { type: Object, default: '' },
})

const Admin = mongoose.model('admin', userSchema)
export default Admin;