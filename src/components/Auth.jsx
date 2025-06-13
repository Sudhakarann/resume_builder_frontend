import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth({ handleAuth, error, user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    const success = await handleAuth({ email, password, name, isRegister });
    if (success) {
      setEmail('');
      setPassword('');
      setName('');
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">{isRegister ? 'Join Resume Builder' : 'Welcome Back'}</h2>
        <form onSubmit={onSubmit} className="auth-form">
          {isRegister && (
            <div className="form-group">
              <label className="form-label">
                <svg className="form-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
                className="form-input"
              />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">
              <svg className="form-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">
              <svg className="form-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 .896 2 2zM16 11c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 .896 2 2zM8 11c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 .896 2 2z" />
              </svg>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="form-input"
            />
          </div>
          <button type="submit" className="btn-primary auth-btn">
            {isRegister ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <button onClick={() => setIsRegister(!isRegister)} className="auth-toggle">
          {isRegister ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </button>
      </div>
    </div>
  );
}

export default Auth;