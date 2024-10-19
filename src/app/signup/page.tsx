"use client"
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import toast from 'react-hot-toast';

function SignupPage() {
  const router = useRouter();
  const [user, setuser] = useState({
    email : "",
    password : "",
    username : ""
  })
  const [buttondisabled, setbuttondisabled] = useState(false);
  const [loading, setloading] = useState(false);

  const onsignup = async()=>{
    try {
      setloading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log("Success", response.data);
      if(response.data.success === false) {
        toast.error(response.data.message);
        return;
      }
      router.push('/login')
      toast.success("Signup successful! Please login!");
    } catch (error:any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  }

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length>0){
      setbuttondisabled(false);
    }else{
      setbuttondisabled(true);
    }
  }, [user]);
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-white'>{loading? "Processing" : "Signup"}</h1>
      <hr/>
      <label htmlFor='username'>Username</label>
      <input type='text' id='username' name='username' value={user.username} onChange={(e)=>setuser({...user, username : e.target.value})} placeholder='username' className='text-black'/>
      <label htmlFor='email'>email</label>
      <input type='email' id='email' name='email' value={user.email} onChange={(e)=>setuser({...user, email : e.target.value})} placeholder='email' className='text-black'/>
      <label htmlFor='password'>password</label>
      <input type='password' id='password' name='password' value={user.password} onChange={(e)=>setuser({...user, password : e.target.value})} placeholder='password' className='text-black'/>
      <button disabled={buttondisabled} onClick={onsignup}>{buttondisabled? "Fill all" : "Signup"}</button>
      <Link href='/login' className='text-white'>Already have an account? Login Here
      </Link>
    </div>
  )
}

export default SignupPage
