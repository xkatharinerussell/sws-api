import { validationResult } from 'express-validator';

export const validateRequest = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            code: "INVALID_REQUEST",
            errors: errors.array()
        });
    }
    else {
        next();
    }
};