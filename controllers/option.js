const { CtrlWrapperr, HttpError } = require("../healpers");
const { OptionModel } = require("../modules/Option");

const createOption = async (req, res) => {
  const { name, optionValues } = req.body;
  const newOption = await OptionModel.create({
    name,
    optionValues,
  });

  res.json(newOption);
};

const getOptions = async (req, res) => {
  const getAllOptions = await OptionModel.find();
  if (!getAllOptions) {
    throw HttpError(404, "Options not found");
  }

  res.json(getAllOptions);
};

const deleteOption = async (req, res) => {
  const { optionId } = req.params;
  const option = await OptionModel.findByIdAndDelete(optionId);
  if (!option) {
    throw HttpError(400, "Option not found");
  }

  res.json({
    option,
    message: "Option success delete",
  });
};

const getOption = async (req, res) => {
  const { optionId } = req.params;
  const options = await OptionModel.find();
  const option = await OptionModel.findOne({ _id: optionId });
  if (!option) {
    throw HttpError(404, "Option not found");
  }

  res.json({
    option,
    options,
  });
};

const updateOption = async (req, res) => {
  const { optionId } = req.params;
  const updateOption = await OptionModel.findByIdAndUpdate(
    optionId,
    { ...req.body },
    { new: true }
  );

  res.json(updateOption);
};

module.exports = {
  createOption: CtrlWrapperr(createOption),
  getOptions: CtrlWrapperr(getOptions),
  deleteOption: CtrlWrapperr(deleteOption),
  updateOption: CtrlWrapperr(updateOption),
  getOption: CtrlWrapperr(getOption),
};
