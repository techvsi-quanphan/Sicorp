import type { NextApiRequest, NextApiResponse } from 'next';
import jsonwebtoken from 'jsonwebtoken';
const Joi = require("joi");

const schema = Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    stripeCharge: Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        displayName: Joi.string().required(),
        value: Joi.number().required(),
        tokenAmount: Joi.number().required(),
    }),
    stripeToken: Joi.string().required(),
    userId: Joi.number().required(),
});

const verifyToken = (handler: any) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            //check schema of body
            // const options = {
            //     abortEarly: false, // include all errors
            //     allowUnknown: true, // ignore unknown props
            //     stripUnknown: true // remove unknown props
            // };
            // const { error, value } = schema.validate(req.body, options);
            // if (error) {
            //     return res.status(400).send('Error format body');
            // } else {
            //     req.body = value;
            // }

            //check token for authenticate
            const token = req.headers['authorization'] || req.body.token || req.query.token;
            if (!token) {
                return res.status(403).send('token is required for authentication');
            }
            const decoded = jsonwebtoken.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET || '');
            return handler(req, res);
        } catch (err) {
            return res.status(401).send('Invalid Token');
        }
    };
};
export default verifyToken;
