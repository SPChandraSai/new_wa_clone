import { createRoot } from 'react-dom/client'
import './index.css'
import Routing_App from './POC/Protected_Routing/Routing_App.jsx';
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import User from './POC/useEffect/user.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App></App>
    {/* <Routing_App></Routing_App> */}
    {/* <User></User> */}
  </BrowserRouter>
,)
