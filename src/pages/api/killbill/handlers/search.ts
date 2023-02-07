import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { addPaymentMethodAsDefault } from "./addPaymentMethodAsDefault";
import { addPaymentMethodId } from "./addPaymentMethodId";
import { createUser } from "./createUser";
import { getTransactions } from "./getTransactions";
import { payment } from "./payment";
import { subscriptions } from "./subscriptions";

export const search = async (res: NextApiResponse, reqData: any) => {
    try {
		const config: any = {
			method: "get",
			url: process.env.NEXT_PUBLIC_BASE_URL + "/accounts/search/" + reqData.email,
			headers: {
				"X-Killbill-ApiKey": process.env.NEXT_PUBLIC_X_Killbill_ApiKey,
				"X-Killbill-ApiSecret": process.env.NEXT_PUBLIC_X_Killbill_ApiSecret,
				Accept: "application/json",
			},
			auth: {
				username: process.env.NEXT_PUBLIC_USER_NAME,
				password: process.env.NEXT_PUBLIC_PASSWORD,
			},
		};

		const response = await axios(config);
		if (response.data.length > 0) {
			console.log(
				"find the account",
				JSON.stringify(response.data, null, 3)
			);
			let user = {
				...response.data[0],
				stripeToken: reqData.stripeToken,
				stripeCharge: reqData.stripeCharge.tokenAmount,
				stripeProductName: reqData.stripeCharge.name,
			};
			let paymentMethodId = null;
			if (!user.paymentMethodId) {
				paymentMethodId = await addPaymentMethodId(user);
				const isDefaultPayment = await addPaymentMethodAsDefault(
					user,
					paymentMethodId
				);
				user = { ...user, paymentMethodId };
				console.log(paymentMethodId, isDefaultPayment);
				const paymentResponse = await payment(user);
				console.log(paymentResponse);
			}
			const subscriptionsResponse = await subscriptions(user);
			console.log(subscriptionsResponse);
			const transactions = await getTransactions(user);
			console.log(transactions);
			let lastTransaction = null;
			if (transactions.length > 0) {
				lastTransaction = transactions[transactions.length - 1];
			}
			return res.status(200).json({
				...lastTransaction,
				message: "Subscription is created successfully",
			});
		} else {
			await createUser(reqData);
			await search(res, reqData);
		}
	} catch (error: any) {
		let errorMessage = error?.message;
		if (error && error?.response && error?.response?.data) {
			errorMessage = error?.response?.data?.causeMessage;
		}
		return res.status(500).json(errorMessage);
	}
}