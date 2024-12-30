import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase";
import { CircleFadingPlusIcon, MessageSquare, UserRoundIcon, ArrowLeft } from 'lucide-react';

function ChatPanel() {
    //   list of users ko lekr aana hy firebase se
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [showProfile, setShowProfile] = useState(false);

    //   if(isLoading) return <div>...loading</div>

    useEffect(() => {
        const getUsers = async () => {
            // isme collection pass kro and data milega 
            const data = await getDocs(collection(db, 'users'));
            // console.log(data.docs.length);
            const arrayOfUser = data.docs.map((docs) => { return { userData: docs.data(), id: docs.id } });
            console.log("18", arrayOfUser);
            setUsers(arrayOfUser);
            setLoading(false);
        };

        getUsers();
    }, []);

    if (showProfile == true) {
        return <>
            <div className="bg-green-400 text-white py-4 text-lg px-4 flex items-center gap-6">
                <button onClick={() => { setShowProfile(false) }}>
                    <ArrowLeft />
                </button>
                <div>Profile</div>
            </div>
            <div className="bg-gray-100">
                {/* <img src={userData.profile_pic} alt="" className="rounded-full h-10 w-10" /> */}
                {/* ...other user data */}
                {/* <h2>{userData.name}</h2> */}
                {/* <h2>{userData.status}</h2> */}
            </div>
        </>
    }

    return (
        <>
            {/* top-bar */}
            <div className="bg-gray-400 py-2 px-4 border-r flex justify-between items-center gap-2">
                <button
                    onClick={() => { setShowProfile(true) }}
                >
                    <img
                        src={"/default-user.png"}
                        alt="profile picture"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                </button>

                <div className="flex items-end justify-center gap-6 mx-4">
                    <CircleFadingPlusIcon className="w-6 h-6" />
                    <MessageSquare className="w-6 h-6" />
                    <UserRoundIcon className="w-6 h-6" />
                </div>
            </div>

            {/* chat list */}
            {
                isLoading ? <div>...loading</div> :
                    <div className="flex flex-col gap-3">
                        {users.map(userObject => (
                            <div key={userObject.id} className="flex gap-3 border-2">
                                {/* render user data here */}
                                <img src={userObject.userData.profile_pic} alt="" className="rounded-full h-10 w-10" />
                                {/* ...other user data */}
                                <h2>{userObject.userData.name}</h2>
                            </div>
                        ))}
                    </div>
            }
        </>
    );
}

export default ChatPanel
