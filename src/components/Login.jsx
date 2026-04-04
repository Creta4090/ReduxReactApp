import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { getSampleUsers } from '../utils/sampleUsers';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sampleUsers, setSampleUsers] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch sample users on component mount
    getSampleUsers().then(setSampleUsers);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await loginUser({ username, password });
      dispatch(loginSuccess(response));
      navigate('/');
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  const handleCopyCredentials = (user, index) => {
    const credentialText = `Username: ${user.username}\nPassword: ${user.password}`;
    
    navigator.clipboard.writeText(credentialText).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }).catch(() => {
      // Fallback for older browsers
      alert(`Username: ${user.username}\nPassword: ${user.password}`);
    });
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="login-card card p-4 shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Login to PostHub</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Sample Users Section */}
          {sampleUsers.length > 0 && (
            <div className="mt-4 pt-4 border-top">
              <p className="text-center mb-3 fw-bold text-muted">Sample Credentials (Click to Copy):</p>
              <div className="sample-users">
                {sampleUsers.map((user, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`btn btn-sm w-100 mb-2 text-start credential-button ${
                      copiedIndex === index ? 'btn-success' : 'btn-outline-secondary'
                    }`}
                    onClick={() => handleCopyCredentials(user, index)}
                  >
                    <div>
                      <strong className="d-block">{user.username}</strong>
                      <small className="text-muted">{user.password}</small>
                      {copiedIndex === index && (
                        <span className="badge bg-success ms-2">Copied!</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;