import axios from "axios";
import { NextApiResponse } from "next";
import jsonwebtoken from 'jsonwebtoken';
import { createUser } from "./createUser";


export const session = async(res: NextApiResponse, reqData: any) =>{
    try{
        const config: any = {
            method: "get",
            url: process.env.NEXT_PUBLIC_BASE_URL + "/accounts/search/" + reqData.email,
            headers: {
                "X-Killbill-ApiKey": "adobe",
                "X-Killbill-ApiSecret": "adobe",
                Accept: "application/json",
            },
            auth: {
                username: process.env.NEXT_PUBLIC_USER_NAME,
                password: process.env.NEXT_PUBLIC_PASSWORD,
            },
        };
    
        const response = await axios(config);
    
        if (response.data.length > 0) {
            // console.log(response.data[0]);
            reqData.acccoutId = response.data[0].accountId;
            reqData.paymentMethodId = response.data[0].paymentMethodId;
    
            const cipherText = jsonwebtoken.sign({ reqData }, process.env.NEXT_PUBLIC_JWT_SECRET || '', { expiresIn: "1d" });
    
            return res.status(200).json({
                cartToken: cipherText,
            });
        } else {
            await createUser(reqData);
            await session(res,reqData);
        }
        return res.status(200).json(response.data[0]);
    }catch(err){
        throw err;
    }
}