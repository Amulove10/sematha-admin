import React from 'react';
import './nav.css'
import logo from '../../assets/logo_dark.png'
import { NavLink} from 'react-router-dom'
function Nav() {
  return (
    <div>
          <nav className="navbar">
              <img src={logo} alt="logo" />
        <ul>
      

          <NavLink to='/addpro' style={{ textDecoration: 'none' }}><li className="nav-item"> Add Projects</li></NavLink>
                  <NavLink to='/project' style={{ textDecoration: 'none' }}> <li className="nav-item">project list</li></NavLink>
          <NavLink to='/blog' style={{ textDecoration: 'none' }}> <li className="nav-item">Post Blog</li></NavLink> 
                    <NavLink to='/bloglist' style={{ textDecoration: 'none' }}> <li className="nav-item">blog list</li></NavLink> 

              </ul>
         </nav>
    </div>
  );
}

export default Nav;
