import { MessageSquareText } from 'lucide-react';
import React from 'react'
import { useParams } from 'react-router-dom'

function ChatWindow() {
  const params = useParams();
  // console.log("Chat params: ", params);

  //Empty screen
  if (!params.chatId)
    return (
      <section className="w-[70%] h-full flex flex-col gap-4 items-center justify-center">
        <MessageSquareText
          className="w-28 h-28 text-gray-400"
          strokeWidth={1.2}
        />
        <p className="text-sm text-center text-gray-400">
          select any contact to
          <br />
          start a chat with.
        </p>
      </section>
    );
    return <h2>Chat : {params.chatId}</h2>
}

export default ChatWindow
