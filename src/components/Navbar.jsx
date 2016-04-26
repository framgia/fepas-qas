import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <div>
      <header>
        {' '}
        <Link to="/">Home</Link>
        {' '}
        <Link to="/auth">Auth</Link>
      </header>
    </div>
  );
};

export default Navbar;
