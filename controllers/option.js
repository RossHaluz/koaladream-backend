const { CtrlWrapperr, HttpError } = require("../healpers");
const { OptionModel } = require("../modules/Option");

const createOption = async(req, res) => {
    const {name, optionValues} = req.body;
    const newOption = await OptionModel.create({ 
        name,
        optionValues
    });
    
    res.json(newOption);
}

const getOptions = async(req, res) => {
    const getAllOptions = await OptionModel.find();
    if(!getAllOptions){
        throw HttpError(404, "Options not found")
    }

    res.json(getAllOptions);
}

const getOptionValues = async(req, res) => {
const {nameOption} = req.params; 
const getOption = await OptionModel.findOne({name: nameOption});
if(!getOption){
    throw HttpError(404, 'Option not found');
}

res.json(getOption);
}
 
module.exports = {
    createOption:  CtrlWrapperr(createOption),
    getOptions: CtrlWrapperr(getOptions),
    getOptionValues: CtrlWrapperr(getOptionValues)
}