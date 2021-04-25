import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import styles from './index.module.scss';

const Header: React.FC = () => {
  return(
    <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">Hospital Clients</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Item as={Link} to="/" className={styles.navlink}>Home</Nav.Item>
    </Nav>
  </Navbar>
  )
}

export default Header;