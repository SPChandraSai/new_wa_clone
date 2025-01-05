import {Route, Routes} from "react-router-dom"
import Login from './Components/Login'
import Chat from './Components/Chat';
import Home from './Components/Home';
import PageNotFound from './Components/PageNotFound';
import ProtectedRoute from "./Components/ProtectedRoute";
import { useState } from "react";

function App() {
  return (
    <>
        <Routes>
            <Route path="/" element={<ProtectedRoute >
              <Home ></Home>
              </ProtectedRoute>}></Route>
            <Route path="/chat/:uniqueId" element={
              <ProtectedRoute ><Chat></Chat></ProtectedRoute>
            }></Route>
            <Route path="/login" element={<Login ></Login>}></Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
    </>
  )
}

export default App


