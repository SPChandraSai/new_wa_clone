function ProtectedRoute(props){
    const isLoggedIn = props.isLoggedIn;
    const childern = props.children;
    if(isLoggedIn){
      return childern;
    }
    else{
      return <Navigate to="/login"></Navigate>
    }
  }

  export default ProtectedRoute;