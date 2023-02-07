import axios from "axios";
import { headers } from "./createHeaderKillbill";

export const addPaymentMethodId = async (user: any) => {
	console.log("addPaymentMethodId", user);

	const data = {
		pluginName: "killbill-stripe",
		isDefault: true,
		pluginInfo: {
			properties: [
				{
					key: "token",
					value: user.stripeToken,
					isUpdatable: true,
				},
			],
		},
	};

	const config: any = {
		method: "post",
		url: process.env.NEXT_PUBLIC_BASE_URL + "/accounts/" + user.accountId + "/paymentMethods",
		headers: headers(),
		auth: {
      username: process.env.NEXT_PUBLIC_USER_NAME,
      password: process.env.NEXT_PUBLIC_PASSWORD,
    },
		data,
	};

	const response = await axios(config);
	if (response.status === 201) {
		const paymentMethodId =
			response.headers.location.split("paymentMethods/")[1];
		console.log("Payment Method is Created", paymentMethodId);
		return paymentMethodId;
	} else {
		throw new Error("Payment was not added, please try again later.");
	}
};