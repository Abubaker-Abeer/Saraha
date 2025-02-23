import Joi from "joi";

const registerschema = Joi.object({
    UserName: Joi.string().min(5).max(15).required(),
    Email: Joi.string().email().required(),
    Passwords: Joi.string().min(6).required(),
});

const loginschema = Joi.object({
    Email: Joi.string().email().required(),
    Passwords: Joi.string().min(6).required(),
});


export { registerschema, loginschema };