import { NavLink } from 'react-router-dom';

import './Header.css';

const Header = () => {
  return (
    <div className="global-header-footer-container">
      <div className='navbar-container'>
        <h1 className='navbar-left'>NavBar</h1>

        <nav className='navbar-right'>
          <ul className='navbar-ul'>
            <li className='navbar-li'><NavLink className="navbar-li-text" to="/" aria-label="Home">Home</NavLink></li>
            <li className='navbar-li'><NavLink className="navbar-li-text" to="/about" aria-label="About">About</NavLink></li>
            <li className='navbar-li'><NavLink className="navbar-li-text" to="/product" aria-label="Products">Products</NavLink></li>
          </ul>
        </nav >
      </div>

    </div>
  );
}

export default Header;