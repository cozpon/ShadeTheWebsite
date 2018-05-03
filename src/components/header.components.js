import React from 'react';
import { Link } from 'react-router-dom';

const MainHeader = () => {
  if(!localStorage.username){
    return (
      <div className="unauth-nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>
    )
  }else{
    return (
       <div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to={`/users/${localStorage.userId}`}>{localStorage.username}</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </div>
    );
  }
}

export default MainHeader;