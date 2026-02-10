import Joi from "joi";
import validationMessages from "../utils/validationMessages.js";

class UserValidation {

    // register user
  static registerUser = Joi.object({
    firstName: Joi.string()
      .required()
      .trim()
      .min(3)
      .messages(validationMessages.firstName),
    lastName: Joi.string()
      .required()
      .trim()
      .min(3)
      .messages(validationMessages.lastName),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .lowercase()
      .required()
      .messages(validationMessages.email),
    password: Joi.string()
      .required()
      .trim()
      .min(8)
      .max(30)
      .messages(validationMessages.password)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?-]).+$/,
      ),
  }).options({
    abortEarly: false,
    stripUnknown: true,
  });

//   user Login validation
  static loginUser = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .lowercase()
      .required()
      .messages(validationMessages.email),

    password: Joi.string()
      .required()
      .trim()
      .messages(validationMessages.password),
  }).options({
    abortEarly: false,
    stripUnknown: true,
  });
}
export default UserValidation;
