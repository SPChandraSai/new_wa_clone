import { Navigate } from "react-router-dom";
import { userAuth } from "./AuthContext";
import { Loader2Icon } from "lucide-react";

function ProtectedRoute(props){
    const {userData, loading}=userAuth();
    if(loading){
      return <div className="w-screen h-screen flex items-center justify-center bg-background">
        <Loader2Icon className="w-8 h-8 animate-spin"/>
      </div>
    }
    const childern = props.children;
    if(userData){
      return childern;
    }
    else{
      return <Navigate to="/login"></Navigate>
    }
  }

  export default ProtectedRoute;