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
    useEffect(() => {
        //checks if u have logged in before
        //kuch bhi changes honge --> yaha update ho jayega without refreshing the page
        onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const docRef = doc(db, "users", currentUser?.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const { uid, photoURL, displayName, email } = docSnap.data();
                    //saved the userData into the context
                    setUserData({
                        id: uid,
                        profile_pic: photoURL,
                        email,
                        name: displayName
                    });
                    console.log("userData Added");
                }
            }
        })
    }, [])
    console.log("userData", userData);
    return <AuthContext.Provider value={{ setUserData, userData }}>
        {children}
    </AuthContext.Provider>
}

export default AuthWrapper;