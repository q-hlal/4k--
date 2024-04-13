import React from 'react';
import { Link } from 'react-router-dom';


const FooterBanner = () => {

  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>20% Off</p>
          <h3>Special Offer</h3>
          <h3>Limited Time</h3>
          <p>Sale ends soon</p>
        </div>
        <div className="right">
          <p>Get yours now!</p>
          <h3>Exclusive Deal</h3>
          <p>This is a special offer description.</p>
          <Link to='/allItem'>
            <button type="button">Shop Now</button>
          </Link>
        </div>

        <img 
          src='./img/topImg.png' className="footer-banner-image"
        />
      </div>
    </div>
  )
}

export default FooterBanner