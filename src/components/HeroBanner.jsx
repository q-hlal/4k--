import React from 'react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">Discover Your Style</p>
        <h3>Fashion Redefined</h3>
        <h1>Elevate Your Wardrobe</h1>
        <img src='./img/bottomImg.png' alt="clothes" className="hero-banner-image"  />

        <div>
          <Link to='/allItem'>
            <button type="button">Explore Collection</button>
          </Link>
          <div className="desc">
            <h5>New Arrivals</h5>
            <p>Explore the latest trends and elevate your style with our new collection of clothing. Find the perfect outfit for every occasion.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;

