import React from "react";

import "./Message.css";

import ReactEmoji from "react-emoji";

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;
  let admin = false
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  if(user === "admin") {
    admin = true
  }
  return <> { admin ? (<div className="flex  items-center flex-col">
  <div className="bg-lime-600 text-center uppercase px-4 py-1 m-2 w-64 rounded-2xl">
    <p className="text-white text-xs" style={{fontSize:"11px"}}>{ReactEmoji.emojify(text)}</p>
  </div>
</div> ) : ( isSentByCurrentUser ? (
    <div className="flex  items-end flex-col">
      <div className="bg-amber-500 text-right px-4 py-2 m-2  rounded-2xl">
        <p className="text-white capitalize" style={{fontSize:"12px"}}>{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="flex justify-start items-start flex-col">
      <div className="bg-gray-300 text-left px-4 m-2 py-2 rounded-2xl">
      <p className="pb-2" style={{fontSize:"10px"}}>@ {user}</p>
        <p className="text-black capitalize" style={{fontSize:"12px"}} >{ReactEmoji.emojify(text)}</p>
      </div>
    </div>))}</>
  
};

export default Message;
