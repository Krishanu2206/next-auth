import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/usermodel";

connect();

export async function POST(request : NextRequest){
    try {
        const reqbody = await request.json();
        const {token} = reqbody;
        console.log(token);
        const user = await User.findOne({verifytoken : token, verifytokenexpiry : {$gt : Date.now()}});

        if(!user){
            return NextResponse.json({success:false, message : "Invalid or Expired Token"}, {status : 401});
        }
        console.log(user);
        user.isverified = true;
        user.verifytoken = undefined;
        user.verifytokenexpiry = undefined;
        await user.save();

        return NextResponse.json({success:true, message : "Email Verification Successful"}, {status : 200});
    } catch (error : any) {
        return NextResponse.json({success:false, message : "Internal Server Error", error : error.message}, {status : 500});
    }
}