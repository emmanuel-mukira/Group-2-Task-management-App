import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // perform logout logic here
    navigate('/login');
  }

  return (
    <div className="header">
      <nav>
        <ul>
        <li><NavLink to = "/login">Login</NavLink> </li>
          <li><NavLink to="/tasks">Tasks</NavLink></li>
          <li><NavLink to="/projects">Projects</NavLink></li>
          <li><NavLink to="/labels">Labels</NavLink></li>
        </ul>
      </nav>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Header;
