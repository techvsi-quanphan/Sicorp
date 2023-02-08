import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        return res.status(200).json("Payment inserted successfully");
    } catch (error: any) {
        return res.status(500).json(error);
    }
}

export default handler;

