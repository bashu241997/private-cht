import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Messages from "./Messages";
import InfoBar from "./InfoBar";
import Input from "./Input";
import Close from "./icons/Close.svg";
import "./Chat.css";
import { useLocation, useNavigate } from "react-router-dom";

const ENDPOINT = "http://localhost:3003";

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [Timer, setTimer] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [Invite, setInvite] = useState("");
  const [Copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(ENDPOINT).then(e=>console.log(e))
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);
    if (!room) {
      navigate("/");
    }
    if (!name) {
      const Data = window.prompt("Enter your name:");
      if (Data) {
        setName(Data);
        navigate(`/chat?name=${Data}&room=${room}`)
      } else {
        navigate("/");
      }
    }
    if (name && room) {
      const url = window.location.href.split("name");
      const secondurl = url[1].split("&")[1];
      const _url = `${url[0]}name=&${secondurl}`;
      setInvite(_url);
      socket.emit("join", { name, room }, (error) => {
        if (error) {
          alert(error);
          navigate("/");
        }
      });
    }
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [location.search]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(Invite)
      .then(() => {
        setTimer(false)
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Name =
    room && room.length > 0 ? room.split("-")[0].toUpperCase() : room;
  return (
    <div
      className="bg-white flex justify-center items-center h-full"
      style={{ height: "100vh" }}
    >
      <div className="bg-white flex flex-col justify-center items-center grow shadow-2xl m-8 appnow">
        {Copied && (
          <div
            className="bg-slate-100 rounded-2xl text-black px-4 py-3 shadow-2xl fixed z-30 top-34"
            style={{ width: "250px" }}
            role="alert"
          >
            <div className="flex justify-center items-center">
              <div className="py-1">
                <svg
                  className="fill-current h-6 w-6 text-white-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div id="copy" onClick={() => handleCopyClick()}>
                <p className="font-bold capitalize" style={{ fontSize: "12px" }}>
                  copied to clipboard
                </p>
              </div>
            </div>
          </div>
        )}
        {Timer && (
          <div
            className="bg-blue-500 rounded-2xl text-white px-4 py-3 shadow-md fixed z-30 top-34"
            style={{ width: "300px" }}
            role="alert"
          >
            <div className="flex">
              <div className="py-1">
                <svg
                  className="fill-current h-6 w-6 text-white-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div id="copy" onClick={() => handleCopyClick()}>
                <p className="font-bold capitalize" style={{ fontSize: "12px" }}>
                  click to copy the invite link
                </p>
                <p className="text-sm" style={{ fontSize: "12px" }}>
                  {Invite}
                </p>
              </div>
              <div
                onClick={() => setTimer(false)}
                className="py-1"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              >
                <img src={Close} alt="close" style={{ width: "100%" }} />
              </div>
            </div>
          </div>
        )}
        <InfoBar room={Name} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
