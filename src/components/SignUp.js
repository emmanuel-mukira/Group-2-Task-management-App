
import React, {useState} from "react";


function SignUp({ onSignUp, addNewUser, loginUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add user.');
        }
        return response.json();
      })
      .then(() => {
        onSignUp();
        window.alert('You have successfully signed up! Now you can log in.');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit" >Sign up</button>
      </form>
      <p>
        Already have an account? <a href="/login" > Login</a>
      </p>
    </div>
  );
}

export default SignUp;