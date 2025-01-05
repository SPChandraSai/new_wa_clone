import { Navigate } from "react-router-dom";
import { userAuth } from "./AuthContext";

function ProtectedRoute(props){
    const {userData}=userAuth();
    const childern = props.children;
    if(userData){
      return childern;
    }
    else{
      return <Navigate to="/login"></Navigate>
    }
  }

  export default ProtectedRoute;