import axios from 'axios';
import { headers } from './createHeaderKillbill';

// const headers = {
// 	"X-Killbill-ApiKey": process.env.NEXT_PUBLIC_X_Killbill_ApiKey,
// 	"X-Killbill-ApiSecret": process.env.NEXT_PUBLIC_X_Killbill_ApiSecret,
// 	"X-Killbill-CreatedBy": process.env.NEXT_PUBLIC_X_Killbill_CreatedBy,
// 	"X-Killbill-Reason": process.env.NEXT_PUBLIC_X_Killbill_Reason,
// 	"X-Killbill-Comment": process.env.NEXT_PUBLIC_X_Killbill_Comment,
// 	Accept: "application/json",
// };

export const createUser = async (reqData: any) => {
  try {
    console.log("createUser", reqData);
	const data = {
		name: reqData.name,
		email: reqData.email,
		currency: "USD",
	};

	const config: any = {
		method: "post",
		url: process.env.NEXT_PUBLIC_BASE_URL + "/accounts",
		headers: headers(),
		data: data,
		auth: {
			username: process.env.NEXT_PUBLIC_USER_NAME,
			password: process.env.NEXT_PUBLIC_PASSWORD,
		},
	};

	const response = await axios(config);
	if (response.status === 201) {
		console.log("newuser is created");
        return true;
	} else {
		throw new Error(
			"Not able to create user on server, please contact administrator"
		);
	}
  } catch (error: any) {
    return null;
  }
};
