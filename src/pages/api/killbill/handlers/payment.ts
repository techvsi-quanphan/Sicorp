import axios from "axios";
import { headers } from "./createHeaderKillbill";

export const payment = async (user: any) => {
	console.log("payment");

	const charge_data = {
		transactionType: "PURCHASE",
		amount: parseInt(user.stripeCharge),
		currency: user.currency ? user.currency : "USD",
	};

	var config: any = {
		method: "post",
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/${user.accountId}/payments?paymentMethodId=${user.paymentMethodId}`,
		headers: headers(),
		auth: {
      username: process.env.NEXT_PUBLIC_USER_NAME,
      password: process.env.NEXT_PUBLIC_PASSWORD,
    },
		data: charge_data,
	};

	const response = await axios(config);
	if (response.headers.location) {
		const paymentUrl = response.headers.location;
		let config: any = {
			method: "GET",
			url: paymentUrl,
			headers: headers(),
			auth: {
				username: process.env.NEXT_PUBLIC_USER_NAME,
				password: process.env.NEXT_PUBLIC_PASSWORD,
			},
		};
		const paymentResponse = await axios(config);
		if (paymentResponse) {
			return paymentResponse.data;
		}
	} else {
		return response;
	}
};