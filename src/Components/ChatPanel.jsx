import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase";

function ChatPanel() {
//   list of users ko lekr aana hy firebase se
  const [users, setUsers]=useState([]);
  const[isLoading, setLoading]=useState(true);

//   if(isLoading) return <div>...loading</div>

  useEffect(()=>{
    const getUsers=async()=>{
        // isme collection pass kro and data milega 
        const data=await getDocs(collection(db, 'users'));
        // console.log(data.docs.length);
        const arrayOfUser=data.docs.map((docs)=>{return {userData: docs.data(), id: docs.id}});
        // console.log("16", arrayOfUser);
        setUsers(arrayOfUser);
        setLoading(false);
    };

    getUsers();
  }, []);

  if (isLoading) return <div>...loading</div>

  return (
    <div>
        {users.map(userObject=>(
            <div key={userObject.id}>
                {/* render user data here */}
                <p>User ID: {userObject.id}</p>
                {/* ...other user data */}
            </div>
        ))}
    </div>
   );
}

export default ChatPanel
