import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import User from '../models/User.js';
import tryCatch from './utils/tryCatch.js';

export const register = tryCatch(async (req, res) => {
    const { name, email, password, } = req.body;
    if (password.length < 6)
        return res.status(400).json({
            success: false,
            message: 'Password must be 6 characters or more',
        });
    const emailLowerCase = email.toLowerCase();
    const existedUser = await User.findOne({ email: emailLowerCase });
    if (existedUser)
        return res.status(400).json({ success: false, message: 'User already exists!' });
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
        name,
        email: emailLowerCase,
        password: hashedPassword,
    });
    const { _id: id, photoUrl } = user;
    const token = jwt.sign({ id, name, photoUrl }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.status(201).json({
        success: true,
        result: { id, name, email: user.email, photoUrl, token },
    });
});

export const login = tryCatch(async (req, res) => {
    const { email, password } = req.body;

    const emailLowerCase = email.toLowerCase();
    const existedUser = await User.findOne({ email: emailLowerCase });
    if (!existedUser)
        return res
            .status(404)
            .json({ success: false, message: 'User does not exist!' });
    const correctPassword = await bcrypt.compare(password, existedUser.password);
    if (!correctPassword)
        return res
            .status(400)
            .json({ success: false, message: 'Password or email may be wrong.' });

    const { _id: id, name, photoUrl } = existedUser;
    const token = jwt.sign({ id, name, photoUrl }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.status(200).json({
        success: true,
        result: { id, name, email: emailLowerCase, photoUrl, token },
    });
});


export const registerAdm = tryCatch(async (req, res) => {
    const { name, email, password, } = req.body;
    if (password.length < 6)
        return res.status(400).json({
            success: false,
            message: 'Password must be 6 characters or more',
        });
    const emailLowerCase = email.toLowerCase();
    const existedUser = await Admin.findOne({ email: emailLowerCase });
    if (existedUser)
        return res.status(400).json({ success: false, message: 'Admin already exists!' });
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await Admin.create({
        name,
        email: emailLowerCase,
        password: hashedPassword,
    });
    const { _id: id, photoUrl } = user;
    const token = jwt.sign({ id, name, photoUrl }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.status(201).json({
        success: true,
        result: { id, name, email: user.email, photoUrl, token },
    });
});

export const loginAdm = tryCatch(async (req, res) => {
    const { email, password } = req.body;

    const emailLowerCase = email.toLowerCase();
    const existedUser = await Admin.findOne({ email: emailLowerCase });
    if (!existedUser)
        return res
            .status(404)
            .json({ success: false, message: 'User does not exist!' });
    const correctPassword = await bcrypt.compare(password, existedUser.password);
    if (!correctPassword)
        return res
            .status(400)
            .json({ success: false, message: 'Password or email may be wrong.' });

    const { _id: id, name, photoUrl } = existedUser;
    const token = jwt.sign({ id, name, photoUrl }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.status(200).json({
        success: true,
        result: { id, name, email: emailLowerCase, photoUrl, token },
    });
});
// export const updateProfile = tryCatch(async (req, res) => {
//     // console.log(req.user.id)
//     const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
//         new: true,
//     });
//     // console.log("hello")
//     // console.log(updateProfile)
//     const { _id: id, name, photoUrl } = updatedUser;

//     // To Do: update all the rooms records added by this user

//     // await Room.updateMany({ uid: req.user.id }, { uName: name, uPhoto: photoUrl })

//     await Room.findOneAndUpdate({ uid: id }, { uName: name, uPhoto: photoUrl });

//     // console.log(result)

//     const token = jwt.sign({ id, name, photoUrl }, process.env.JWT_SECRET, {
//         expiresIn: '1h',
//     });
//     res.status(200).json({ success: true, result: { name, photoUrl, token } });
// });