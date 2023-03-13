const Joi = require("joi");

const createUserValidator = async (req, res, next) => {
  const schema = Joi.object()
    .keys({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      date_of_birth: Joi.string(),
      phone_number: Joi.string().required(),
      department: Joi.string().required(),
      staff_number: Joi.string().required(),
      employment_date: Joi.string().required(),
      position: Joi.string().required(),
      role: Joi.string().required(),
    })
    .with("email", "password");

  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: `${error.details[0].message}` });
  }
};
const loginValidator = async (req, res, next) => {
  const schema = Joi.object()
    .keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    })
    .with("email", "password");

  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: `${error.details[0].message}` });
  }
};

module.exports = {
  createUserValidator,
  loginValidator,
};
