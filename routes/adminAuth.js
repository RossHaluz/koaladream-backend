const { loginUser, registerUser } = require("../controllers/adminAuth");
const { validateBody } = require("../middleware");
const { adminAuthSchema } = require("../modules/AdminAuth");
const route = require("express").Router();

//Login user in admin
route.post("/admin-login", validateBody(adminAuthSchema), loginUser);

//Register user in admin
route.post("/admin-register", validateBody(adminAuthSchema), registerUser);

module.exports = route;
