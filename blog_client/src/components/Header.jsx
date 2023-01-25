import React, { useState, useEffect } from 'react'
import './component.css'
import { Link, useLocation } from "react-router-dom";

import { isLoggedIn } from '../utils';
import { revokeAccessToken } from '../actions';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const [activePage, setActivePage] = useState('home')
  const location = useLocation();
  const navigation = useNavigate()

  useEffect(() => {
    if(location.pathname === '/'){
      setActivePage('home')
    }else if(location.pathname === '/login'){
      setActivePage('login')
    }else if(location.pathname === '/register'){
      setActivePage('register')
    }else if(location.pathname === '/dashbaord'){
      setActivePage('dashbaord')
    }
  }, [location.pathname])

  const logout = async () =>{
    try{
      let data = {
        'refresh':localStorage.getItem('refresh')
      }
      const res = await revokeAccessToken(data)
      localStorage.clear()
      navigation('/')
    }catch(err){

    }
  }
  

  return (
    <div>
      <header>
        <div className='container container-flex'>
          <div className='site-title'>
            <h1>Awesome Blog</h1>
          </div>
          <nav>
            <ul>
              <li><Link className={activePage === 'home' ? 'current-page' : '' } to="/" > Home</Link></li>
              {isLoggedIn() === true ? (
                <>
                <li><Link onClick={() => logout()}> Logout</Link></li>
                <li><Link className={activePage === 'dashbaord' ? 'current-page' : '' } to="/dashbaord"> Dashboard</Link></li>
                </>
                
              ):(
                <>
                <li><Link className={activePage === 'login' ? 'current-page' : '' } to="/login"  > Login</Link></li>
                <li><Link className={activePage === 'register' ? 'current-page' : '' } to="/register"> Register</Link></li>
                </>
              )}
              
              
            </ul>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Header