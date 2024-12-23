import {Route, Routes} from "react-router-dom"
import Login from './Components/Login'
import Chat from './Components/Chat';
import Home from './Components/Home';
import PageNotFound from './Components/PageNotFound';
import Profile from './Components/Profile';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        {/* it will only match with /login string */}
        <Route path="/login" element={<Login></Login>}></Route>
        {/* it will match to the route that has chat/sometext */}
        <Route path="/chat/:uniqueId" element={<Chat></Chat>}></Route>
        {/* (*) it will match with everything, kind off universal */}
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </>
  )
}

export default App
