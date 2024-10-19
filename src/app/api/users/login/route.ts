import connect from '@/dbConfig/dbConfig';
import User from '@/model//usermodel';
import {NextRequest, NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const {email, password} = reqbody;
        console.log(reqbody);

        //validations
        if(!email ||!password) {
            return NextResponse.json({success:false, message : 'All fields are required'}, {status : 400});
        }
        const user = await User.findOne({ email: email});
        if(!user){
            return NextResponse.json({success:false,message : 'User not found'}, {status : 404});
        }
        if(user){
            //compare password
            const isMatch = await bcryptjs.compare(password, user.password);
            if(!isMatch) {
                return NextResponse.json({success:false,message : 'Invalid credentials'}, {status : 401});
            }
        }

        //create token data
        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        };
        const token = await jwt.sign({tokenData : tokenData}, process.env.TOKEN_SECRET!, {expiresIn : '1d'})
        const response = NextResponse.json({success : true, message : "Login successfull", user:user}, {status : 200});
        response.cookies.set('token', token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
            httpOnly : true,
            maxAge : 1000 * 60 * 60 * 24
        });
        return response;

    } catch (error : any) {
        return NextResponse.json({success:false, message : "Internal Server Error", error : error.message}, {status : 500});
    }
}