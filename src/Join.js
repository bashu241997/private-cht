import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SignIn() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [Number, setNumber] = useState(Math.floor(Math.random() * 10000));

  return (
    <div
      className="bg-white flex justify-center items-center h-full grid grid-cols-1 md:grid-cols-2"
      style={{ height: "100vh" }}
    >
     <div className="flex flex-col justify-center items-start p-10">
       <img src="/favicon.ico" width={100} className="mb-3" />
        <h1 className="capitalize text-3xl pb-6 font-bold">
          private{" "}
          <span className="text-lime-700 text-3xl capitalize font-bold">
            ping
          </span>
        </h1>
        <div className="capitalize py-3 text-gray-700 text-xl">
          secure your life and privatize your conversations
        </div>
        <div
          className="flex items-center capitalize text-gray-700 text-sm py-3"
          role="alert"
        >
          <svg
            className="fill-current w-16 h-16 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
          </svg>
          <p className="text-sm text-justify"> Invite & chat with your colleagues, friends, crush, partners &
          strangers in private without backup your chat history will be deleted on leaving room </p>
        </div>
      </div>
      <div className="bg-white flex flex-col justify-center items-center shadow-2xl m-8 p-10">
        <h1 className="p-4 uppercase text-lime-700 font-bold">private Ping</h1>
        <div className="m-3 ">
          <input
            placeholder="Name"
            className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="m-3">
          <input
            placeholder="Room"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <NavLink
          className="m-3 w-48"
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room + "-" + Number}`}
        >
          <button
            className="bg-lime-700 hover:bg-lime-600 w-full text-white font-boldfont-semibold py-2 px-4 border border-gray-400 rounded shadow"
            type="submit"
          >
            Sign In
          </button>
        </NavLink>
      </div> 
    </div>
  );
}
