import React from 'react'
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import ChatPanel from './ChatPanel';
import Chat from './Chat';

function Home() {
  const handleChanges=(e)=>{
    console.log("Change Event");
    const img=e.target.files[0];
    //address
    const storageRef=ref(storage, "/profile"+Math.random());
    //storage task
    uploadBytesResumable(storageRef, img);
    uploadTask.on("state_changed", progressCB, errorCB, finishCB);
    //upload
    function progressCB(data){
      console.log("data", data);
    }
    //if error
    function errorCB(error){
      console.log("error", err);
    }
    //on success
    function finishCB(){
      console.log("successfully uploaded the file", success);
      getDownloadURL(uploadTask.snapshot.ref).then(function (url){
        console.log("url", url);
      })
    }
  }
  return (
    <>
      <div>Home</div>
      {/* <input type="file"
      accept='image/png image/jpeg image/webp'
      onChange={handleChanges}
      ></input> */}

      {/* conditional rehne vaali hy --> chat list, profile */}
      <ChatPanel></ChatPanel>
      
      {/* <div>Empty Chat</div>:<div>Individual Chat</div> */}
      <Chat></Chat>
    </>
  )
}

export default Home