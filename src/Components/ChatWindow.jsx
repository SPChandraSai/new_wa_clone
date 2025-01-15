import { MessageSquareText, PlusIcon, SendIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';

function ChatWindow() {
  const params = useParams();
  const [msg, setMsg] = useState("");
  const [secondUser, setSecondUser] = useState();
  const [msgList, setMsgList] = useState([]);

  //this is done to generate a unique chat id between two user based on user id.
  const chatId =
    userData?.id > receiverId
      ? `${userData.id}-${receiverId}`
      : `${receiverId}-${userData?.id}`;

  const receiverId = params.chatId
  const handleSendMsg = async () => {
    if(msg){
      const date = new Date();
      const timestamp = date.toLocaleString("en-US",{
        hour: "numeric",
        minutes: "numeric",
        hour12: true,
      });

      //start chat with the user
      if(msgList?.length === 0){
        await setDoc(doc(db, "user-chats", chatId),{
          chatId:chatId,
          message: [
            {
              text: msg,
              time: timestamp,
              sender: userData.id,
              receiver: receiverId,
            },
          ],
        });
      }
      else{
        //update in the message list
        
      }
      setMsg("");
    }
  }

  useEffect(() => {
    //request, data fetch
    const getUser = async () => {
      const docRef = doc(db, "users", receiverId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSecondUser(docSnap.data());
      }
    };
    getUser();
    const msgUnsubscribe = onSnapshot(doc(db, "user-chats", chatId), (doc) => {
      setMsgList(doc.data()?.message || []);
    });

    return () => {
      msgUnsubscribe();
    }

  }, [receiverId])

  //Empty screen
  if (!receiverId)
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

  //Chat screen
  return <section className="w-[70%] h-full flex flex-col gap-4 items-center justify-center">
    <div className="h-full w-full bg-chat-bg flex flex-col">
      {/* top bar */}
      <div className="bg-background py-2 px-4 flex items-center gap-2 shadow-sm">
        <img
          src={secondUser?.profile_pic || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}
          alt="profile picture"
          className="w-9 h-9 rounded-full object-cover"
        />
        <h3>{secondUser?.name}</h3>
      </div>

      {/* messages list */}
      <div className="flex-grow flex flex-col gap-12 p-6 ">
        {msgList?.map((m, index) => {
          <div
            key={index}
            data-sender={m.sender === userData.id}
            className={`bg-white w-fit rounded-md p-2 shadow-sm max-w-[400px] break-words data-[sender=true]:ml-auto data-[sender=true]:bg-primary-light`}
          >
            <p>{m?.text}</p>
            <p className="text-xs text-neutral-500 text-end">
              {m?.time}
            </p>
          </div>
        })}
      </div>

      {/* chat input */}
      <div className="bg-background py-3 px-6 shadow flex items-center gap-6">
        <PlusIcon />
        <input type="text" className="w-full py-2 px-4 rounded focus:outline-none" placeholder="Type a message"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMsg();
            }
          }}

        />
        <button onClick={handleSendMsg}>
          <SendIcon />
        </button>
      </div>
    </div>
  </section>
}

export default ChatWindow