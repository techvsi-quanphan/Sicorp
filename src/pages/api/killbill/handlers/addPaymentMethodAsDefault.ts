import axios from "axios";
import { headers } from "./createHeaderKillbill";

export const addPaymentMethodAsDefault = async (user: any, paymentMethodId: any) => {
	console.log("addPaymentMethodAsDefault");

	const config: any = {
		method: "put",
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/${user.accountId}/paymentMethods/${paymentMethodId}/setDefault`,
		headers: headers(),
		auth: {
      username: process.env.NEXT_PUBLIC_USER_NAME,
      password: process.env.NEXT_PUBLIC_PASSWORD,
    },
		data: {},
	};

	const response = await axios(config);
	if (response) {
		console.log("Payment Method is Set as Default", paymentMethodId);
		return true;
	} else {
		throw new Error("Payment was not added, please try again later.");
	}
};