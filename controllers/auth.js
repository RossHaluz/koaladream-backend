const { CtrlWrapperr, HttpError, sendMail } = require("../healpers");
const { UserModel } = require("../modules/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {SECRET_KEY, BASE_URL} = process.env;

const register = async (req, res) => {
    const { email, password} = req.body;
    const user = await UserModel.findOne({email});
    if(user) {
        throw HttpError(400, 'User already is register');
    }

const hashPassword =  bcrypt.hash(password, 10);
const createUser = await UserModel.create({
    ...req.body,
    password: hashPassword,
});

if(!createUser){
    throw HttpError(400, 'Something is wrong...')
}

const payload = {
    id: createUser._id
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '24h'});

    const newUser = await UserModel.findByIdAndUpdate(createUser._id, {token}, {new: true})

res.json({
    newUser,
    message: 'Succsess register!'
})

}

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    if(!user) {
        throw HttpError(404, "User not found");
    }
    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '24h'});
    const isCorrectPassword = await bcrypt.compare(password, user.password);
   
    if(isCorrectPassword === false){
        throw HttpError(401, "Email or password is wrong");
    }

    const loginUser = await UserModel.findByIdAndUpdate(user._id, {token}, {new: true});

    res.json({
        loginUser,
        message: "Success login"
    })
}

const logout = async (req, res) => {
    const {id} = req.userId;
    const logoutUser = await UserModel.findByIdAndUpdate(id, {token: ''}, {new: true});

    res.json({
        logoutUser,
        message: 'Success logout'
    })
}

const current = async (req, res) => {
const {id} = req.userId;
const user = await UserModel.findById(id);
if(!user){
    throw HttpError(404, 'User not found')
}

res.json(user)
}

const forgotPassword = async (req, res) => {
const {email} = req.body;
const changePassword = {
    to: email,
    subject: 'Change password',
    html: `<p>To change your password, follow the link: <a target="_blank" href="${BASE_URL}/api/user/change-password/${email}">Change password</a></p>`
}
sendMail(changePassword)

res.json({
    message: "Message for change password, successfully sent to your email"
})
}

const changePassword = async(req, res) => {
    const {id} = req.userId;
    const {oldPassword, newPassword} = req.body;
    const user = await UserModel.findOne({_id: id});
    if(!user) {
        throw HttpError(404, 'User not found')
    }
    const auditOldPassword = await bcrypt.compare(oldPassword, user.password);
    if(!auditOldPassword){
        throw HttpError(400, "Old password is not correct");
    }

    const hashPassword = await bcrypt.hash(newPassword, 10)
    const updateUser = await UserModel.findByIdAndUpdate(user._id, {password: hashPassword}, {new: true});

    res.json({
        updateUser,
        message: 'Password success change'
    })
}

const update = async (req, res) => {
    const {id} = req.userId;
    if(req.file){
        const {path} = req.file;
        const uloadUserWithAvatar = await UserModel.findByIdAndUpdate(id, {
            ...req.body,
            avatar: path
        }, {new: true})

        return res.json(uloadUserWithAvatar)
    }
    const updateUser = await UserModel.findByIdAndUpdate(id, {...req.body}, {new: true});
    res.json({
        updateUser,
        message: 'User successfuly update'
    })
}


module.exports = {
    register: CtrlWrapperr(register),
    login: CtrlWrapperr(login),
    logout: CtrlWrapperr(logout),
    current: CtrlWrapperr(current),
    forgotPassword: CtrlWrapperr(forgotPassword),
    changePassword: CtrlWrapperr(changePassword),
    update: CtrlWrapperr(update),
}