import connect from '@/dbConfig/dbConfig';
import User from '@/model//usermodel';
import {NextRequest, NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendmail } from '@/helpers/mailer';

connect();

export async function POST(request : NextRequest){
    try {
        const reqbody = await request.json();
        const {email, password, username} = reqbody;
        console.log(reqbody);

        //validations
        if(!username ||!email ||!password){
            return NextResponse.json({success:false, message : 'Please provide all required fields'}, {status : 400});
        }
        const user = await User.findOne({ email: email});
        if(user){
            return NextResponse.json({success:false, message : 'Email already exists'}, {status : 400});
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        const savedresponse = await newUser.save();
        console.log(savedresponse);

        //send verification email
        await sendmail({email : savedresponse.email, emailType : "VERIFY", userid : savedresponse._id});

        return NextResponse.json({success : true, message : "User created successfully", user : savedresponse}, {status : 200});
        
    } catch (error:any) {
        return NextResponse.json({success:false, message : "Internal Server Error", error : error.message}, {status : 500});
    }
}