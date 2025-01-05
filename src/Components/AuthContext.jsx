import { useContext, useState } from "react";
import React from "react";

const AuthContext = React.createContext();
//hook
export function userAuth(){
    return useContext(AuthContext);
}

function AuthWrapper({children}){
    const [userData, setUserData] = useState(null);

    return <AuthContext.Provider value={{setUserData, userData}}>
        {children}
    </AuthContext.Provider>
}

export default AuthWrapper;