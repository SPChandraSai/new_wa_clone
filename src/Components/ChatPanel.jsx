import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase";
import { CircleFadingPlusIcon, MessageSquare, UserRoundIcon } from 'lucide-react';
import Profile from './Profile';

function ChatPanel() {
    //   list of users ko lekr aana hy firebase se
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [showProfile, setShowProfile] = useState(false);

    //   if(isLoading) return <div>...loading</div>

    useEffect(() => {
        const getUsers = async () => {
            // isme collection pass kro and data milega 
            const snapShot = await getDocs(collection(db, 'users'));
            // console.log(data.docs.length);
            const arrayOfUser = snapShot.docs.map((docs) => { return { userData: docs.data(), id: docs.id } });
            console.log("18", arrayOfUser);
            setUsers(arrayOfUser);
            setLoading(false);
        };
        getUsers();
    }, []);
    const onBack = () => { setShowProfile(false) };
    if (showProfile == true) {
        return <Profile onBack={onBack}/>
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
