import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/Signup';
import Login from './components/Login';
function App() {
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
    setShowLogin(true);
  };
  const handleSignUp = () => {
    setShowLogin(false);
  };
  return (
    <div className='homepage'>
      <h4>Welcome to</h4>
      <h1>todo.<span>Task</span></h1>
      <h2>Achieve more with us on your side.</h2>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser} />} />
          <Route path="/signup" element={<SignUp onSignUp={handleSignUp}/>} />
          <Route
          path="/login"
          element={
          <Login users={users}
          onLogin={handleLogin}
          onSignUp={handleSignUp}
          setCurrentUser={setCurrentUser}
          />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App