import React from 'react'
import { useForm } from 'react-hook-form'
import { login } from '../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Login = () => {
  const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loginHandler = async (data) => {
    const response = await login(data, navigate)
    // dispatch(login(data, navigate))
  }

  return (
    <div className='flex flex-col items-center mt-5'>
      <p className='text-3xl font-medium text-center mb-5'>Login</p>
      <form className='flex flex-col items-center gap-5' onSubmit={handleSubmit(loginHandler)}>
        <label className='min-w-[350px]'>
          <p className='mb-1'>Email*</p>
          <input
            type='email'
            name='email'
            className='border shadow-md w-full p-2 px-3 rounded-lg'
            id='email'
            required
            placeholder='Enter your Email...'
            {...register("email")}
          />
        </label>
        <label className='min-w-[350px]'>
          <p className='mb-1'>Password*</p>
          <input
            type='password'
            name='password'
            className='border shadow-md w-full p-2 px-3 rounded-lg'
            id='password'
            required
            placeholder='Enter your Password...'
            {...register("password")}
          />
        </label>
        <button className='border rounded-lg px-3 p-2 bg-[#082F66] text-white hover:bg-[#1E40AF] text-md font-medium' type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login