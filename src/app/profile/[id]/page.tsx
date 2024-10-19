import React from 'react'

function Userprofile({params} : any) {
  return (
    <div className=''>
        <h1>Profile Page</h1>
        <hr/>
        <p className='text-4xl'>Profile Page {params.id}</p>
    </div>
  )
}

export default Userprofile
