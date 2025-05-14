/* eslint-disable no-unused-vars */
import { TopBar } from './components/Topbar/TopBar';

import Home from './pages/Home/Home';
import Login from './pages/login/Login';
import Settings from './pages/Settings/settings';
import Write from './pages/write/write';
import Single from './pages/single/single';
import Register from './pages/Register/register';
import Contact from './pages/Contact/Contact';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {
  const {user}=useContext(Context);
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={user ? <Home/> : <Register/>} />
        <Route exact path="/login" element={user ? <Home/>:<Login/>} />
        <Route exact path="/write" element={user ? <Write/>:<Register/>} />
        <Route exact path="/settings" element={user ?<Settings/> :<Register/>} />
        <Route exact path="/contact" element={user ? <Contact/>:<Home/>} />
        
        <Route exact path="/post/:postId" element={<Single/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
