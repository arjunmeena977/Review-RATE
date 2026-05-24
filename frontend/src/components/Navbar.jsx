import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <div style={{ background: 'var(--primary-gradient)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px' }}>
            ★
          </div>
          Review<span>&RATE</span>
        </Link>
        
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <Search size={18} color="var(--primary)" style={{ cursor: 'pointer' }} />
        </div>

        <div className="nav-links">
          <Link to="/signup">SignUp</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
