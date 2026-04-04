import './Header.css'
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';

export default function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            📰 PostHub
          </Link>
           {isAuthenticated ? ( <>
           <span className="nav-link">Welcome, {user?.username}</span></> ) : null }
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/')}`} aria-current="page" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/about')}`} to="/about">
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/posts')}`} to="/posts">
                      Posts
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/photos')}`} to="/photos">
                      Photos
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/contact')}`} to="/contact">
                      Contact
                    </Link>
                  </li>
                 
                   <li className="nav-item">
                    <button className="btn btn-outline-primary nav-link" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                 
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
