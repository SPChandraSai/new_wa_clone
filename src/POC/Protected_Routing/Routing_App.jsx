import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from "./Home"
import Login from './Login'
import Chat from './Chat'
import ProtectedRoute from "./ProtectedRoute"

function Routing_App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
        <h1>Routing_App</h1>
        <Routes>
            <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn} >
              <Home setIsLoggedIn={setIsLoggedIn}></Home>
            </ProtectedRoute>}></Route>
            <Route path="/chat/:uniqueId" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}><Chat></Chat></ProtectedRoute>
            }></Route>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}></Login>}></Route>
        </Routes>
    </>
  )
}

export default Routing_App
