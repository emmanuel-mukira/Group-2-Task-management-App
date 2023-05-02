import React, { useEffect, useState } from "react";
//import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Labels from "./components/Labels";

function App () {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleSignUp = () => {
    setShowLogin(true);
  };

  const handleToggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      {currentUser ? (
        <p>Welcome, {currentUser.username}!</p>
      ) : (
        showLogin ? (
          <Login users={users} onLogin={handleLogin} onSignUp={handleSignUp} />
        ) : (
          <SignUp onSignUp={handleSignUp} />
        )
      )}
      <button onClick={handleToggleForm}>
        {showLogin ? 'Sign up' : 'Login'}
      </button>
      <Labels />
    </div>
  );
}



export default App;