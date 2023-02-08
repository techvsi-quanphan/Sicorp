import axios from "axios";
import { headers } from "./createHeaderKillbill";

export const subscriptions = async (user: any) => {
    console.log("subscriptions");

    const data = {
        accountId: user.accountId,
        planName: user.stripeProductName
            ? user.stripeProductName
            : "daily_Subscription",
    };

    const config: any = {
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscriptions`,
        headers: headers(),
        auth: {
            username: process.env.NEXT_PUBLIC_USER_NAME,
            password: process.env.NEXT_PUBLIC_PASSWORD,
        },
        data: data,
    };
    const subscriptionsResponse = await axios(config);
    if (subscriptionsResponse) {
        return subscriptionsResponse.data;
    } else {
        return subscriptionsResponse;
    }
};