import { Link } from 'react-router-dom';
import '../Header.css';

function Header() {
  return (
    <header className="header">
      <img src="/EzMovieLogo.png" alt="EZTech Logo" className="logo" />
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/cart" className="nav-link">Cart</Link>
      </nav>
    </header>
  );
}

export default Header;
