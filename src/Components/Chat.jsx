import React from 'react'
import { useParams } from 'react-router-dom'

function Chat() {
  const params = useParams();
  console.log("Chat params: ",params);
  
  if(params.chatId){
    return <h2>Chat : {params.chatId}</h2>
  }

  return <h2> Empty screen </h2>
}

export default Chat
