import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { addPaymentMethodAsDefault } from '../handlers/addPaymentMethodAsDefault';
import { addPaymentMethodId } from '../handlers/addPaymentMethodId';
import { payment } from '../handlers/payment';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user = req.body;
    console.log(user);

    let paymentMethodId = null;
    if (!user.paymentMethodId) {
      paymentMethodId = await addPaymentMethodId(user);
      const isDefaultPayment = await addPaymentMethodAsDefault(
        user,
        paymentMethodId
      );
      user = { ...user, paymentMethodId };
      console.log(user, isDefaultPayment);
    }
    const paymentResponse = await payment(user);
    console.log(user);

    return res.status(200).json({
      ...paymentResponse,
      message: "Payment Done successfully",
    });
  } catch (error: any) {
    let errorMessage = error?.message;
    if (error && error?.response && error?.response?.data) {
      errorMessage = error?.response?.data?.causeMessage;
    }
    return res.status(500).json(errorMessage);
  }
}

export default handler;
