import type {NextApiRequest, NextApiResponse} from 'next';
import jsonwebtoken from 'jsonwebtoken';

// custom NextApiRequest

const verifyToken = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.headers['authorization'] || req.body.token || req.query.token;
      if (!token) {
        return res.status(403).send('A x-access-token is required for authentication');
      }
      const decoded = jsonwebtoken.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET || '');
      return handler(req, res);
    } catch (err) {
      return res.status(401).send('Invalid Token');
    }
  };
};
export default verifyToken;
