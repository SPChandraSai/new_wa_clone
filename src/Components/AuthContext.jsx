import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if (currentUser) {
                const docRef = doc(db, "users", currentUser?.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const { profile_pic, name, email, lastSeen } = docSnap.data();
                    //saved the userData into the context
                    await SetLastSeen(currentUser);
                    setUserData({
                        id: currentUser.uid,
                        profile_pic,
                        email,
                        name,
                        lastSeen
                    });
                }
            }
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const SetLastSeen = async(user) => {
        const date = new Date();
        const timeStamp = date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        await updateDoc(doc(db, "users", user.uid), {
            lastSeen: timeStamp,
        });
    }

    console.log("userData", userData);
    return <AuthContext.Provider value={{ setUserData, userData, loading }}>
        {children}
    </AuthContext.Provider>
}

export default AuthWrapper;