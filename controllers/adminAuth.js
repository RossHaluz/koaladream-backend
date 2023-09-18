const { CtrlWrapperr, HttpError } = require("../healpers");
const { AdminAuthModel } = require("../modules/AdminAuth");

const loginUser = async(req, res) => {
    
}

module.exports = { 
    loginUser: CtrlWrapperr(loginUser)
}