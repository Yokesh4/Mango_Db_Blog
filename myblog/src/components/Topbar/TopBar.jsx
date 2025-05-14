/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import './TopBar.css'
import { useContext } from 'react';
import { Context } from '../../context/Context'



export const TopBar = () => {
  const{user,dispatch}=useContext(Context);

  const handleLogout=() =>{
    dispatch({type:"LOGOUT"});
  }
  return (
    <div className='top'>
          
          <div className="top-left">
          <i className="topIcon fa-brands fa-square-facebook"></i>
          <i className="topIcon fa-brands fa-square-twitter"></i>
          <i className="topIcon fa-brands fa-square-pinterest"></i>
          <a href='https://www.instagram.com/theyogii_/'><i className="topIcon fa-brands fa-square-instagram"></i></a>
          <i className="topIcon fa-brands fa-github"></i>
          <a href='https://www.linkedin.com/in/mariaanthonyyokesh/'><i className="topIcon fa-brands fa-linkedin"></i></a>
          
          </div>
          <div className="top-center">
            <ul className="top-list">
                <li className="toplist-items">
                  <Link className='link' to="/">HOME</Link>
                </li>
                <li className="toplist-items">
                <Link className='link' to="/">ABOUT</Link>
                </li>
                <li className="toplist-items">
                <Link className='link' to="/contact">CONTACT</Link>
                </li>
                <li className="toplist-items">
                <Link className='link' to="/write">WRITE</Link>
                </li>
                <li className="toplist-items"
                 onClick={handleLogout}
                >
                  {user && "LOGOUT"}
                </li>

            </ul>
          </div>
          <div className="top-right">
            {
              
              user ? (
                <Link to="/settings">
                <img className='topImg' 
                  src={user.profilePic} 
               alt=" "></img>
               </Link>
              ) : (
                <ul className='top-list'>
                  <li className='toplist-items'>
                  <Link className='link' to="/login">Login</Link>
                  </li>
                  <li className='toplist-items'>
                  <Link className='link' to="/register">Register</Link>
                  </li>
                
                
                </ul>
              )
            }
          
          <i className=" topSearchIcon fa-solid fa-magnifying-glass"></i>
          </div>
          
        </div>
  )
}
