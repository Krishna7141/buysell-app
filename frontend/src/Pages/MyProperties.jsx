import React, { useEffect, useState } from 'react'
import { deleteProperty, getMyProperties } from '../services/operations/propertyAPI'
import { Link } from 'react-router-dom'
import {BiSolidEdit} from 'react-icons/bi'
import {AiOutlineDelete} from 'react-icons/ai'

const MyProperties = () => {
  const [data, setData] = useState([])
  const token = JSON.parse(localStorage.getItem("token"))
  const fetchUserProperties = async () => {
    const response = await getMyProperties(token)
    setData(response)
  }
  useEffect(() => {
    fetchUserProperties()
  }, [])
  console.log(data)
  const deleteHandler = async (propertyId) => {
    const response = await deleteProperty(propertyId, token)
  }

  return (
    <div className='p-5'>
      <p className='text-4xl mb-7 font-medium text-center'>My Properties</p>
      <Link className='border rounded-lg px-3 mx-4 md:mx-0 p-2 bg-[#082F66] text-white hover:bg-[#1E40AF] text-md font-medium' to={'/add-property'}>Add Property</Link>
      <div className='flex flex-wrap gap-4 mt-10 mb-32 justify-center lg:justify-start'>
        {
          data.map((prop) => (
            <div className='border w-11/12 shadow-md md:w-fit min-w-[297px] items-start flex flex-col gap-3 p-6 hover:shadow-xl transition-all duration-200 cursor-pointer rounded-lg' key={prop._id}>
              <p className='text-xl font-medium'>{prop?.name}</p>
              <p className='text-lg'>Rent: <span className='text-blue-700 text-lg font-medium'>₹{prop?.price}</span><span className='text-black font-normal text-sm'> /month</span></p>
              <p className='text-lg'>Location: <span className='font-medium text-red-950'>{prop?.location}</span></p>
              <div className='flex gap-3'>
                <p>BedRooms: <span className='font-semibold text-red-700'>{prop?.bedRooms}</span></p>
                <p>Halls: <span className='font-semibold text-red-700'>{prop?.hallRooms}</span></p>
              </div>
              <p>Residential Type: <span className='text-lg font-semibold text-green-700'>{prop?.typeOfProperty}</span></p>
              <div className='flex gap-2 justify-center items-center mx-auto w-11/12'>
                <Link className='w-1/2 flex justify-center border p-3 rounded-lg text-white bg-green-500 hover:bg-green-700' to={`/edit-property/${prop._id}`}><BiSolidEdit size={20}/></Link>
                <button className='w-1/2 flex justify-center border p-3 rounded-lg text-white bg-red-500 hover:bg-red-700' onClick={() => deleteHandler(prop._id)}><AiOutlineDelete size={20}/></button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyProperties