//import area


import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/ui/Layout'
import BusinessRegister from './pages/BusinessRegister'
import Detail from './pages/Detail'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'



//defination area
export default function App() {


  //2.1 hook area

  //2.2 function defiantion area



  //2.3 return statement
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='detail' element={<Detail />}></Route>
          {
            window.localStorage.getItem('token-->') !== null &&
            < Route path='business_Register' element={<BusinessRegister />}></Route>

          }



        </Route>

      </Routes>
    </BrowserRouter >
  )
}


//export area