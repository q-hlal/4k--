import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import SingleItemInfo from "../db.json"

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <Link to="/Account">Account</Link>
        <Link to="/summery">Summery</Link>
      </div>

      <div className="navbar-center">
        <p className="logo">
          <Link to="/">4K ClothesBrand</Link>
        </p>
      </div>

      <div className="navbar-right">
        <Link to="/add">Add</Link>
        <Link to="/sell">Sell</Link>
        
        <Link to="/detail" className="cart-icon">
          <AiOutlineShopping />
          <span className="cart-item-qty">{SingleItemInfo.SingleItemInfo.length}</span>

        </Link>
      </div>
    </div>
  );
};

export default Navbar;
