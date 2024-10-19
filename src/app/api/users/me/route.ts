import {getdatafromtoken} from "@/helpers/getdatafromtoken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/usermodel";
import connect from "@/dbConfig/dbConfig";

connect();

export async function GET(request : NextRequest){
    try {
        const userid = await getdatafromtoken(request);
        console.log(userid);
        const user = await User.findById(userid).select("-password");
        if(!user){
            return NextResponse.json({success : false, message : "User not found"}, {status : 404});
        }
        return NextResponse.json({success : true, message : "User found", data : user}, {status : 200});
    } catch (error:any) {
        return NextResponse.json({success:false, message : "Internal Server Error", error : error.message}, {status : 500});
    }
}