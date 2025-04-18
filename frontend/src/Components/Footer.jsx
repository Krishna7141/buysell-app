import React from 'react'
import { AiFillLinkedin, AiOutlineLinkedin, AiFillGithub, AiOutlineTwitter, AiOutlineGoogle, AiOutlineInstagram } from 'react-icons/ai'
import { RiTwitterXLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { SiOpenai } from 'react-icons/si'


const Footer = () => {
  return (
    <div className='bg-[#002456] text-white pt-5 pb-8'>
      <div className='max-w-[1280px] mx-auto'>
        {/* <p className='absolute left-0 bottom-2 text-[5rem] select-none'>Krishna Vamshi Kusuma</p> */}
        <div className='flex justify-normal items-center gap-10 flex-col md:flex-row md:justify-between pt-20 pb-16 px-10'>
          <p className='font-normal text-md'>© KrishnaVamsi.</p>
          <p className='text-3xl md:text-4xl'>🎯</p>
          <div className='flex gap-x-2 items-center'>
            <Link className='hover:text-[#1E40AF]' to='https://www.linkedin.com/in/krishna-chelluboina/' target='_blank'><AiFillLinkedin size={40}/></Link>
            <Link className='hover:text-[#1E40AF]' to='https://github.com/Krishna7141' target='_blank'><AiFillGithub size={40}/></Link>
            <Link className='hover:text-[#1E40AF]' to='mailto:krishnavamsich2000@gmail.com' target='_blank'><AiOutlineGoogle size={40}/></Link>
            <Link className='hover:text-[#1E40AF]' to='https://x.com/krish127228?s=21' target='_blank'><RiTwitterXLine size={35}/></Link>
            <Link className='hover:text-[#1E40AF]' to='https://www.instagram.com/__vamsi46__/' target='_blank'><AiOutlineInstagram size={40}/></Link>
          </div>
        </div>
        {/* <p className='left-0 bottom-0 text-5xl text-gray-300 select-none'>Krishna Vamshi Kusuma</p> */}
      </div>
    </div>
  )
}

export default Footer
