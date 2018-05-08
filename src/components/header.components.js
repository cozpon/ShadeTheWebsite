import React from 'react';
import { Link } from 'react-router-dom';

const MainHeader = () => {
  if(!localStorage.username){
    return (
      <div className="unauth-nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/termsofservice">Terms of Service</Link>
        <Link to="/contact">Contact</Link>
      </div>
    )
  }else{
    return (
       <div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to={`/users/${localStorage.userId}`}>{localStorage.username}</Link>
          <Link to="/logout">Logout</Link>
          <Link to="/termsofservice">Terms of Service</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    );
  }
}

export default MainHeader;