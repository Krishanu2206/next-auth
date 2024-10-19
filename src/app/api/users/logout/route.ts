import {NextResponse } from 'next/server'

export async function GET(){
    try {
        const response = NextResponse.json({
            success : true,
            message : "Logout successfully"
        }, {status : 200})
        response.cookies.set('token', "", {
            expires: new Date(0), // 1 day
            httpOnly : true,
            maxAge : 1000 * 60 * 60 * 24
        });
        return response;
    } catch (error : any)  {
        return NextResponse.json({success:false, message : "Internal Server Error", error : error.message}, {status : 500});
    }
}