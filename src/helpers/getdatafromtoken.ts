import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getdatafromtoken = async(request : NextRequest)=>{
    try {
        const token = request.cookies.get('token')?.value || '';
        console.log(token);
        const decoded:any = await jwt.verify(token, process.env.TOKEN_SECRET!);
        console.log(decoded);
        return decoded.tokenData.id;
    } catch (error : any) {
        throw new Error(error.message)
    }
}