import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { Loader } from "lucide-react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // Get messages & setup listeners
  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex justify-center items-center w-[55vw] h-full">
        <Loader />
      </div>
    );
  }
  // console.log(messages[0].intent);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        {messages.map((message) => (
          <div
          key={message._id}
          className={`chat ${
            message.senderId === authUser._id ? "chat-end" : "chat-start"
          }`}
          ref={messageEndRef}
          >
           
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
           
          <div className={`chat-bubble relative px-4 py-2`}>
  {message.intent && (
    <span
      className={`absolute right-[7px] top-[-17px] text-[10px] px-2 py-[4px] rounded-full text-white ${
        message.intent === "urgent"
          ? "bg-red-500"
          : message.intent === "reminder"
          ? "bg-yellow-500"
          : message.intent === "toxic"
          ? "bg-purple-500"
          : message.intent === "abusive"
          ? "bg-black"
          : message.intent === "casual"
          ? "bg-blue-500"
          : "bg-gray-500"
      }`}
    >
      {message.intent.toUpperCase()}
    </span>
  )}

  {message.image && (
    <img
      src={message.image}
      alt="Attachment"
      className="sm:max-w-[200px] rounded-md mb-2"
    />
  )}
  {message.text && <p>{message.text}</p>}
</div>

          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
