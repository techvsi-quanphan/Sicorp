import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import jsonwebtoken from 'jsonwebtoken';
import { createUser } from '../handlers/createUser';
import { session } from '../handlers/session';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' });
            return;
        }
        const reqData = req.body;
        return session(res, reqData);
    } catch (error: any) {
        return res.status(500).json(error);
    }
}

export default handler;

