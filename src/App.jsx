import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/index.css';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Editor from './components/Editor';
import AtsResult from './components/AtsResult';
import ErrorBoundary from './components/ErrorBoundary'; // Import ErrorBoundary
import Home from './components/Home';
import Jobs from './components/Jobs';

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: 'https://resume-builder-frontend-h8wa.onrender.com/api',
  withCredentials: true,
});

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/me');
        setUser(res.data);
      } catch (err) {
        console.error('Fetch user error:', err.response?.data || err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function handleAuth({ email, password, name, isRegister }) {
    setError('');
    setLoading(true);
    try {
      let res;
      if (isRegister) {
        res = await api.post('/register', { name, email, password });
      } else {
        res = await api.post('/login', { email, password });
      }
      setUser(res.data.user || res.data);
      return true;
    } catch (err) {
      console.error('Auth error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await api.post('/logout');
      setUser(null);
      setError('');
    } catch (err) {
      console.error('Logout error:', err.response?.data || err.message);
      setError('Error logging out');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home user={user} logout={logout} />} />
          <Route
            path="/auth"
            element={<Auth handleAuth={handleAuth} error={error} user={user} />}
          />
          <Route
            path="/dashboard"
            element={
              user ? (
                <Dashboard user={user} logout={logout} />
              ) : (
                <Auth handleAuth={handleAuth} error={error} user={user} />
              )
            }
          />
          <Route
            path="/editor/:template/:resumeId?"
            element={
              user ? (
                <ErrorBoundary>
                  <Editor user={user} logout={logout} setError={setError} />
                </ErrorBoundary>
              ) : (
                <Auth handleAuth={handleAuth} error={error} user={user} />
              )
            }
          />
          <Route
            path="/ats-result"
            element={
              user ? (
                <AtsResult user={user} />
              ) : (
                <Auth handleAuth={handleAuth} error={error} user={user} />
              )
            }
          />
          <Route
            path="/jobs"
            element={
              user ? (
                <Jobs />
              ) : (
                <Auth handleAuth={handleAuth} error={error} user={user} />
              )
            }
          />
          <Route path="*" element={<Home user={user} logout={logout} />} />
        </Routes>
        {error && (
          <div className={`alert ${error.includes('successfully') ? 'alert-success' : 'alert-error'}`}>
            {error}
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;