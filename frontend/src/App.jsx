import React from 'react'
import './App.css'
import {Routes, Route, useNavigate} from 'react-router-dom'
import NavBar from './Components/NavBar'
import Home from './Pages/Home'
import AddProperty from './Pages/AddProperty'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import EditProperty from './Pages/EditProperty'
import MyProperties from './Pages/MyProperties'
import { useSelector } from 'react-redux'
import Error from './Pages/Error'
import Footer from './Components/Footer'


function App() {
  const {token} = useSelector(state => state.auth)

  return (
    <div>
      <NavBar/>
      <hr/>
      <div className='max-w-[1280px] mb-36 mx-auto'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          {
            token && (
              <>
                <Route path='/my-properties' element={<MyProperties/>}/>
                <Route path='/add-property' element={<AddProperty/>}/>
                <Route path='/edit-property/:propertyId' element={<EditProperty/>}/>
              </>
            )
          }
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
      </div>
      <div className='bottom-0'><Footer/></div>
    </div>
  )
}

export default App
