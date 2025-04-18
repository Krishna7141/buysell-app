import React from 'react'
import Logo from '../assets/K_Logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {IoMdHome} from 'react-icons/io'
import { logout } from '../services/operations/authAPI'


const NavBar = () => {
  const {token} = useSelector(state => state.auth)
  console.log(token)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = async () => {
    navigate('/')
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className='shadow-md'>
      <div className='flex items-center p-2 max-w-[1280px] mx-auto justify-between px-3'>
          <div className='flex items-center gap-10'>
            <Link to={'/'}><img src={Logo} alt='logo' className='h-14'/></Link>
            <Link className='hidden md:flex items-center gap-1 border border-black px-3 p-2 rounded-lg' to={'/'}><IoMdHome/><p className='hidden md:block'>Home</p></Link>
            <Link className='border rounded-lg px-3 p-2 bg-[#082F66] text-white hover:bg-[#1E40AF] text-md font-medium' to={'https://www.google.com'} target='_blank'>About Me</Link>
          </div>
          {
            !token
            ? (
              <div className='flex gap-5'>
                  <Link to={'/login'} className='border px-3 py-2 rounded-lg border-black'>LogIn</Link>
                  <Link to={'/signup'} className='border px-3 py-2 rounded-lg border-black'>SignUp</Link>
              </div>
            )
            : (
              <div className='flex gap-3'>
                <Link className='border border-black px-3 p-2 rounded-lg' to={'/my-properties'}>My Properties</Link>
                {/* <Link to={'/add-property'}>Add Property</Link> */}
                <button className='border px-3 p-2 rounded-lg bg-red-500 hover:bg-red-700 text-white font-medium' onClick={logoutHandler}>Logout</button>
              </div>
            )
          }
      </div>
    </div>
  )
}

export default NavBar