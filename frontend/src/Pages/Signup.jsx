import React from 'react'
import {useForm} from 'react-hook-form'
import { signup } from '../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'


const Signup = () => {
  const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm()
  const navigate = useNavigate()
  const signupHandler = async (data) => {
    const response = await signup(data, navigate)
  }

  return (
    <div className='flex flex-col items-center mt-5'>
      <p className='text-3xl font-medium text-center mb-5'>SignUp</p>
      <form className='flex flex-col items-center gap-5' onSubmit={handleSubmit(signupHandler)}>
        <label className='min-w-[350px]'>
          <p className='mb-1'>Name*</p>
          <input
            type='text'
            className='border shadow-md w-full p-2 px-3 rounded-lg'
            name='name'
            id='name'
            required
            placeholder='Enter your Name...'
            {...register("name")}
          />
        </label>
        <label className='min-w-[350px]'>
          <p className='mb-1'>Email*</p>
          <input
            className='border shadow-md w-full p-2 px-3 rounded-lg'
            type='email'
            name='email'
            id='email'
            required
            placeholder='Enter your Email...'
            {...register("email")}
          />
        </label>
        <label className='min-w-[350px]'>
          <p className='mb-1'>Create Password*</p>
          <input
            type='password'
            name='password'
            className='border shadow-md w-full p-2 px-3 rounded-lg'
            id='password'
            required
            placeholder='Create a New Password'
            {...register("password")}
          />
        </label>
        <button className='border rounded-lg px-3 p-2 bg-[#082F66] text-white hover:bg-[#1E40AF] text-md font-medium' type='submit'>Signup</button>
      </form>
    </div>
  )
}

export default Signup