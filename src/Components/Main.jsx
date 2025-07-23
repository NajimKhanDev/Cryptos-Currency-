import React from 'react'
import Navbar from './Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Footer from '../Footer/Footer'
import Coin from '../Pages/Coin/Coin'

const Main = () => {
  return (
    <>
    
    <div>
      <Navbar/>
    </div>

    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/coin/:id' element={<Coin/>}></Route>
    </Routes>
    <Footer />
    </>

  )
}

export default Main
