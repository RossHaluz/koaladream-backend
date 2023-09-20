const { CtrlWrapperr, HttpError } = require("../healpers");
const { AdminAuthModel } = require("../modules/AdminAuth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const loginUser = async (req, res) => {
  const { password, email } = req.body;
  const user = await AdminAuthModel.findOne({ email });
  if (!user) {
    throw HttpError(400, "Email or password is not correct");
  }
  const passVerification = await bcrypt.compare(password, user.password);
  if (!passVerification) {
    throw HttpError(400, "Password or email is not correct");
  }
  const payload = {
    id: user._id,
  };
  const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  const hashPassword = await bcrypt.hash(password, 10);
  const loginUser = await AdminAuthModel.findByIdAndUpdate(
    user._id,
    {
      token,
      password: hashPassword,
    },
    { new: true }
  );

  res.json(loginUser);
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await AdminAuthModel.findOne({ email });
  if (user) {
    throw HttpError(400, "User already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await AdminAuthModel.create({
    email,
    password: hashPassword,
  });

  res.json(newUser);
};

module.exports = {
  loginUser: CtrlWrapperr(loginUser),
  registerUser: CtrlWrapperr(registerUser),
};
