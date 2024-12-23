import React from 'react'
import { useParams } from 'react-router-dom'

function Chat() {
  const params = useParams();
  console.log(params);
  return (
    <div>Chat : {params.uniqueId}</div>
  )
}

export default Chat
