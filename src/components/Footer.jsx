import React from 'react';
import { AiFillFacebook, AiFillInstagram} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2024 4K ClothesBrand All rights reserverd</p>
      <p className="icons">
        <AiFillInstagram />
        <AiFillFacebook />
      </p>
    </div>
  )
}

export default Footer