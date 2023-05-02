import { useState } from "react";

function Login({ users, onLogin, onSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const user = findUser(username, password);
    if (user) {
      onLogin(user);
    } else {
      setError('Invalid username or password');
    }
  };

  const handleSignUpClick = (event) => {
    event.preventDefault();
    onSignUp();
  };

  const findUser = (username, password) => {
    return users.find(user => user.username === username && user.password === password);
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="#signup" onClick={handleSignUpClick}>Sign up</a></p>
    </div>
  );
}

export default Login;