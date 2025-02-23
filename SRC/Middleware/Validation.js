import { AppError } from "../utils/AppError.js";

const validation = (schema) => {
    return (req, res, next) => {
        const inputData = { ...req.body, ...req.params };
        
        const validateResult = schema.validate(inputData, { abortEarly: false });

        if (validateResult?.error) {
            return next(new AppError(400,validateResult.error));
        }
        
        next();
    };
};

export default validation;
