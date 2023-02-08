import jsonwebtoken from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

const user = {
    id: 1,
    firstName: 'Ansari',
    lastName: 'Sajid',
    email: 'sajidansari@gmail.com'
}
async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      res.status(405).send({message: 'Only POST requests allowed'});
      return;
    }
    
	return res.status(200).json({
        token: jsonwebtoken.sign({sub: user.id}, process.env.NEXT_PUBLIC_JWT_SECRET || '', { expiresIn: "7d" }),
        ...user
    })
	} catch (error: any) {
		return res.status(500).json(error);
	}
}

export default handler;

