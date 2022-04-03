import React from 'react';

import onlineIcon from './icons/onlineIcon.png';
import closeIcon from './icons/Close.svg';

import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="w-full bg-lime-600 text-white capitalize flex grow justify-between p-3 items-center">
    <div className="flex justify-center items-center">
      <img className="px-2" src={onlineIcon} alt="online icon" />
      <h3 className='px-2'>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} style={{width:"26px"}} alt="close icon" /></a>
    </div>
  </div>
);

export default InfoBar;