import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import React from "react";

const AuthContext = React.createContext();
//hook
export function userAuth() {
    return useContext(AuthContext);
}

function AuthWrapper({ children }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        //checks if u have logged in before
        //kuch bhi changes honge --> yaha update ho jayega without refreshing the page
        const unsubscribe =  onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if (currentUser) {
                const docRef = doc(db, "users", currentUser?.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const { profile_pic, name, email } = docSnap.data();
                    //saved the userData into the context
                    setUserData({
                        id: currentUser.uid,
                        profile_pic,
                        email,
                        name
                    });
                    console.log("userData Added");
                }
            }
            setLoading(false);
        })
        return ()=>{
            unsubscribe();
        }
    }, [])
    console.log("userData", userData);
    return <AuthContext.Provider value={{ setUserData, userData, loading }}>
        {children}
    </AuthContext.Provider>
}

export default AuthWrapper;