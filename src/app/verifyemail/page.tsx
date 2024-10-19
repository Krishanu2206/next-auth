"use client"
import axios from "axios";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import toast from "react-hot-toast";

export default function VerifyEmailpage(){
    const [token, settoken] = useState("");
    const [verified, setverified] = useState(false);
    const [error, seterror] = useState(false);

    const verifyemail = async()=>{
        try{
            const response = await axios.post(`/api/users/verifyemail`, {token});
            if(response.data.success){
                setverified(true);
                toast.success("Email verified successfully!");
            }else{
                seterror(true);
                toast.error("Failed to verify email. Please try again.");
                return;
            }
        }catch(error : any){
            seterror(true);
            console.log(error.response.data);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        const urltoken = window.location.search.split("=")[1];
        settoken(urltoken || "");
    }, [])

    useEffect(()=>{
        if(token.length > 0) verifyemail();
    }, [token]);

    return (
        <div className="container">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-700 text-white">{token? `${token}` : "no token"}</h2>
            {verified && (
                <div>
                    <p>Email verified successfully!</p>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <p>Something went wrong!</p>
                </div>
            )}
        </div>
    )
}