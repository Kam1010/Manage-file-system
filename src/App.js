
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import { useState } from 'react';
import Profile from './components/Profile';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Header style={{display:"flex", height:"100px", width:"100vw", border:"1px solid black"}} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
        <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />}>
            {/* <Login onLogin={handleLogin} /> */}
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />}>
            {/* {isLoggedIn ? <Profile /> : <Login onLogin={handleLogin} />} */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
