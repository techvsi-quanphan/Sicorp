
export const headers = () => {
    return {
        "X-Killbill-ApiKey": process.env.NEXT_PUBLIC_X_Killbill_ApiKey,
        "X-Killbill-ApiSecret": process.env.NEXT_PUBLIC_X_Killbill_ApiSecret,
        "X-Killbill-CreatedBy": process.env.NEXT_PUBLIC_X_Killbill_CreatedBy,
        "X-Killbill-Reason": process.env.NEXT_PUBLIC_X_Killbill_Reason,
        "X-Killbill-Comment": process.env.NEXT_PUBLIC_X_Killbill_Comment,
        Accept: "application/json",
    };
}