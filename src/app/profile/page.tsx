"use client"
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useRouter} from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

function ProfilePage() {
  const router = useRouter();
  const [data, setdata] = useState({});
  const onlogout = async() => {
    try {
      const response = await axios.get('/api/users/logout');
      console.log(response.data);
      if(response.data.success === false) {
        toast.error(response.data.message);
        return;
      }
      router.push('/login');
      toast.success('User logged out successfully!')
    } catch (error : any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    }
  }

  const getuserdetails = async() => {
    try {
      const response = await axios.get('/api/users/me');
      console.log(response.data);
      if(response.data.success === false) {
        toast.error(response.data.message);
        return;
      }
      setdata(response.data.data);
      toast.success('User details retrieved successfully!')
    } catch (error : any) {
      console.log("Error retrieving user details", error.message);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getuserdetails();
  }, [setdata]);

  return (
    <div className=''>
        <h1>Profile Page</h1>
        <hr/>
        <p>Profile Page</p>
        <h2>{data === null ? "Nothing" : (
          <Link href={`/profile/${data?.username}`}>{data?.username}</Link>
        )}</h2>
        <hr/>
        <button onClick={getuserdetails} className=''>GET USER</button>
        <br/>
        <button onClick={onlogout} className=''>Logout</button>
    </div>
  )
}

export default ProfilePage
