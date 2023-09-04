const { checkAuth } = require("./checkAuth");
const { uploadAvatar } = require("./upload");
const { validateBody } = require("./validateBody");

module.exports = {
    checkAuth,
    validateBody,
    uploadAvatar
}