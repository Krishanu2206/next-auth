"use client"
import React, {useState ,useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import toast from 'react-hot-toast';

function LoginPage() {
  const router = useRouter();
  const [user, setuser] = useState({
    email : "",
    password : "",
  })
  const [buttondisabled, setbuttondisabled] = useState(false);
  const [loading, setloading] = useState(false);

  const onlogin = async()=>{
    try {
      setloading(true);
      const response = await axios.post('/api/users/login', user);
      console.log("Success", response.data);
      if(response.data.success === false) {
        toast.error(response.data.message);
        return;
      }
      router.push('/profile')
      toast.success("Login successful!");
    } catch (error:any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  }

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0){
      setbuttondisabled(false);
    }else{
      setbuttondisabled(true);
    }
  }, [user]);
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-white'>{loading? "Processing":"Login"}</h1>
      <hr/>
      <label htmlFor='email'>email</label>
      <input type='email' id='email' name='email' value={user.email} onChange={(e)=>setuser({...user, email : e.target.value})} placeholder='email' className='text-black'/>
      <label htmlFor='password'>password</label>
      <input type='password' id='password' name='password' value={user.password} onChange={(e)=>setuser({...user, password : e.target.value})} placeholder='password' className='text-black'/>
      <button disabled={buttondisabled} onClick={onlogin}>{buttondisabled ? "Fill all details" : "Login"}</button>
      <Link href='/signup' className='text-white'>Don't have an account? Signup Here
      </Link>
    </div>
  )
}

export default LoginPage
