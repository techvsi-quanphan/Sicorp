import axios from "axios";
import { headers } from "./createHeaderKillbill";

export const getTransactions = async (user: any) => {
	console.log("getTransactions");

	const config: any = {
		method: "GET",
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/${user.accountId}/payments`,
		headers: headers(),
		auth: {
      username: process.env.NEXT_PUBLIC_USER_NAME,
      password: process.env.NEXT_PUBLIC_PASSWORD,
    },
	};
	const paymentsResponse = await axios(config);
	if (paymentsResponse) {
		return paymentsResponse.data;
	} else {
		return paymentsResponse;
	}
};