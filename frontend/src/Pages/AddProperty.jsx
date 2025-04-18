import React from 'react'
import {useForm} from 'react-hook-form'
import { addProperty } from '../services/operations/propertyAPI'
import { useNavigate } from 'react-router-dom'
import { propertyTypes } from '../../utils/constants'
import { locationsData } from '../../utils/constants'

const AddProperty = () => {
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem("token"))
    // console.log(token)
    const {register, handleSubmit, getValues, setValue, formState: {errors}} = useForm()

    const formSubmit = async (data) => {
        const response = await addProperty(data, token, navigate)
        console.log("Data: ", response)
    }

  return (
    <div className='flex flex-col items-center mt-5 mb-5'>
        <p className='text-3xl font-medium text-center mb-5'>Add Property</p>
        <form className='flex border p-5 rounded-lg shadow-md flex-col items-center gap-5' onSubmit={handleSubmit(formSubmit)}>
            <label className='min-w-[350px]'>
                <p>Property Name</p>
                <input
                    name='name'
                    type='text'
                    id='name'
                    className='border shadow-md w-full p-2 px-3 rounded-lg'
                    required
                    placeholder='Enter Property Name...'
                    {...register("name")}
                />
            </label>
            <label className='min-w-[350px]'>
                <p>Price</p>
                <input
                    name='price'
                    type='number'
                    id='price'
                    className='border shadow-md w-full p-2 px-3 rounded-lg'
                    required
                    min='1'
                    placeholder='Enter Rent Amount...'
                    {...register("price")}
                />
            </label>
            <label className='min-w-[350px]'>
                <p>Location</p>
                <select
                    name='location'
                    id='location'
                    className='border shadow-md w-full p-2 px-3 rounded-lg'
                    required
                    // defaultValue={propData?.typeOfProperty}
                    {...register("location")}
                >
                    <option value="" disabled>Select Option</option>
                    {
                        locationsData.map((loc, index) => (
                            <option key={index} value={loc}>{loc}</option>
                        ))
                    }   
                </select>
            </label>
            <label className='min-w-[350px]'>
                <p>Number of Bed Rooms</p>
                <input
                    type='number'
                    name='bedRooms'
                    id='bedRooms'
                    className='border shadow-md w-full p-2 px-3 rounded-lg'
                    required
                    placeholder='Enter No. of Bed Rooms...'
                    {...register("bedRooms")}
                />
            </label>
            <label className='min-w-[350px]'>
                <p>Number of Halls</p>
                <input
                    name='hallRooms'
                    type='number'
                    id='hallRooms'
                    className='border shadow-md w-full p-2 px-3 rounded-lg'
                    required
                    placeholder='Enter No. of Halls...'
                    {...register("hallRooms")}
                />
            </label>
            <label className='min-w-[350px]'>
                <p>Type of Property</p>
                <select
                    name='typeOfProperty'
                    id='typeOfProperty'
                    className='border shadow-md w-full p-2 px-3 rounded-lg'
                    defaultValue=""
                    {...register("typeOfProperty")}
                >
                    <option value="" disabled>Select Option</option>
                    {
                        propertyTypes.map((prop, index) => (
                            <option key={index} value={prop}>{prop}</option>
                        ))
                    }   
                </select>
            </label>
            <button className='border rounded-lg px-3 p-2 bg-[#082F66] text-white hover:bg-[#1E40AF] text-md font-medium' type='submit'>Add Property</button>
        </form>
    </div>
  )
}

export default AddProperty