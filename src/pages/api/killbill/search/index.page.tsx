import verifyToken from '@/middleware/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { search } from '../handlers/search';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      res.status(405).send({message: 'Only POST requests allowed'});
      return;
    }
		const reqData = req.body;
		return search(res, reqData);
	} catch (error: any) {
		return res.status(500).json(error);
	}
}

export default verifyToken(handler);

