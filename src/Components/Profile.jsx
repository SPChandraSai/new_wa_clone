import React from 'react'
import { ArrowLeft } from 'lucide-react' 
import { userAuth } from './AuthContext'

function Profile(props) {
  const { userData } = userAuth();
  return (
    <>
      <div className="bg-green-400 text-white py-4 text-lg px-4 flex items-center gap-6">
        <button onClick={props.onBack}>
          <ArrowLeft />
        </button>
        <div>Profile</div>
      </div>
      <div className="bg-gray-100">
        <img src={userData.profile_pic} alt="" className="rounded-full h-10 w-10" />
        {/* ...other user data */}
        <h2>{userData.name}</h2>
        <h2>{userData.email}</h2>
        {/* <h2>{userData.status}</h2> */}
      </div>
    </>
  )
}

export default Profile
