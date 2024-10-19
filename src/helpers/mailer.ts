import nodemailer from 'nodemailer';
import User from '@/model/usermodel';
import bcryptjs from 'bcryptjs';

export const sendmail = async({email, emailType, userid} : any)=>{
    try {
        //create a hashed token
        const hashedtoken = await bcryptjs.hash(userid.toString(), 10);

        if(emailType === "VERIFY"){
            const user = await User.findByIdAndUpdate(userid, {verifytoken : hashedtoken, verifytokenexpiry : Date.now() + 3600000}, {new : true});
        }else{
            const user = await User.findByIdAndUpdate(userid, {forgotpasswordtoken : hashedtoken, forgotpasswordtokenexpiry : Date.now() + 3600000}, {new : true});
        }

        const USER = process.env.USER;
        const PASS = process.env.PASSWORD;
        const HOST = process.env.HOST;

        const transport = nodemailer.createTransport({
        host: `${HOST}`,
        port: 2525,
        auth: {
            user: `${USER}`,
            pass: `${PASS}`
        }
        });

        const mailoptions = {
            from : `${process.env.SENDER}`,
            to : email,
            subject : emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html : `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedtoken}">Here</a> to ${emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'}</p>`
        }
        const mailresponse = await transport.sendMail(mailoptions);
        return mailresponse;

    } catch (error : any) {
        throw new Error(error.message);
    }
}

