"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const express_validator_1 = require("express-validator");
exports.validateRegister = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email required")
        .isEmail()
        .withMessage("Invalid Email Format"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password Required"),
    (0, express_validator_1.body)("username").notEmpty().withMessage("Username Required"),
    (0, express_validator_1.body)("fullname").notEmpty().withMessage("Fullname Required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ errors: errors.array() });
            return;
        }
        next();
    }
];
