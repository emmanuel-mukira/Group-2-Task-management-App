import React from "react";

function SignUp  ({ onSignUp ,addNewUser}) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      addNewUser(username, password);
      onSignUp();
    };
  
    return (
      <div>
        <h2>Sign up</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={handleUsernameChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={handlePasswordChange} />
          </div>
        <button type="submit">Sign up</button>
      </form>
      <p>Already have an account? <a href="#login">Login</a></p>
    </div>
  );
};

export default SignUp;