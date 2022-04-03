import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="w-full flex grow justify-between" >
    <input
      className="bg-white w-full grow outline-0 text-black font-bold font-semibold py-2 px-4 rounded shadow-md"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="bg-lime-700 hover:bg-lime-600  text-white font-boldfont-semibold py-2 capitalize border border-gray-400 rounded shadow-md px-12" onClick={e => sendMessage(e)}>Send</button>
  </form>
)

export default Input;