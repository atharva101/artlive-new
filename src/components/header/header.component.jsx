import React, { useState } from 'react';

import { auth } from '../../Firebase/firebase.utils'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
  
} from 'reactstrap';

const Header = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Music Stream</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href = "/#about-us" >About us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>Events</NavLink>
            </NavItem>
          </Nav>
         
          {currentUser ? (
          <div style={{color: '#fff', cursor: 'pointer'}} onClick={() => auth.signOut()}>
            Sign Out
          </div>
      ) : (
        <NavLink href = "/signin">
            <span style={{color: '#fff'}}>Sign In</span>  
          </NavLink>
      )}
          
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;