import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div>
      <div className='flex gap-5 flex-col items-center justify-center w-full mt-56'>
        <p className='text-2xl'>⚠️ 404 Page Does Not Exist !!! </p>
        <Link className='border rounded-lg px-3 p-2 bg-[#082F66] text-white hover:bg-[#1E40AF] text-md font-medium' to={'/'}>Go Home</Link>
      </div>
    </div>
  )
}

export default Error