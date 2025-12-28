import React from 'react';
import './Header.css';

const Header = ({ user }) => {
  return (
    <header className="adminHeader">
      <div className="headerLeft">
        <h1>1920w light</h1>
      </div>
      <div className="headerRight">
        <button className="expandBtn">⛶</button>
        <div className="userProfile">
          <div className="avatar">
            {user.name.charAt(0)}
          </div>
          <div className="userInfo">
            <h3>{user.name}</h3>
            <p>Sinh viên</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;