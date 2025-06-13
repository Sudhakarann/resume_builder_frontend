import { Link, useNavigate } from 'react-router-dom';
import '../styles/home.css';

function Home({ user, logout }) {
  const navigate = useNavigate();

  const handleProtectedNavigation = (path) => {
    if (!user) {
      navigate('/auth');
    } else {
      navigate(path);
    }
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="navbar-left">
              <div className="navbar-brand">
                <Link to="/">JobPortal</Link>
              </div>
              <div className="navbar-links">
                <Link to="/" className="nav-link active">Home</Link>
                <button 
                  onClick={() => handleProtectedNavigation('/dashboard')} 
                  className="nav-link"
                >
                  Create Resume
                </button>
                <button 
                  onClick={() => handleProtectedNavigation('/jobs')} 
                  className="nav-link"
                >
                  Search Jobs
                </button>
              </div>
            </div>
            <div className="navbar-right">
              {user ? (
                <div className="flex items-center">
                  <span className="user-greeting">{user.name}</span>
                  <button onClick={logout} className="auth-button">Logout</button>
                </div>
              ) : (
                <Link to="/auth" className="auth-button">Login/Signup</Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h1 className="hero-title">Find Your Dream Job</h1>
          <p className="hero-subtitle">Create a professional resume and connect with top employers</p>
          <button 
            onClick={() => handleProtectedNavigation('/dashboard')} 
            className="hero-button"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="how-it-works-container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">
                <span>1</span>
              </div>
              <h3 className="step-title">Create Resume</h3>
              <p className="step-description">Build a professional resume with our easy-to-use editor.</p>
            </div>
            <div className="step-card">
              <div className="step-number">
                <span>2</span>
              </div>
              <h3 className="step-title">Search Jobs</h3>
              <p className="step-description">Explore thousands of job opportunities tailored to your skills.</p>
            </div>
            <div className="step-card">
              <div className="step-number">
                <span>3</span>
              </div>
              <h3 className="step-title">Apply</h3>
              <p className="step-description">Apply to jobs directly with your resume and track your applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonials">
        <div className="testimonials-container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">"JobPortal helped me land my dream job in just two weeks!"</p>
              <p className="testimonial-author">Jane Doe</p>
              <p className="testimonial-role">Software Engineer</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"The resume builder is fantastic and easy to use."</p>
              <p className="testimonial-author">John Smith</p>
              <p className="testimonial-role">Marketing Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div>
              <h3 className="footer-title">JobPortal</h3>
              <p className="footer-text">Your gateway to a successful career.</p>
            </div>
            <div>
              <h3 className="footer-title">Links</h3>
              <ul className="footer-links">
                <li className="footer-link"><Link to="/">Home</Link></li>
                <li className="footer-link">
                  <button 
                    onClick={() => handleProtectedNavigation('/dashboard')}
                    className="footer-link-button"
                  >
                    Create Resume
                  </button>
                </li>
                <li className="footer-link">
                  <button 
                    onClick={() => handleProtectedNavigation('/jobs')}
                    className="footer-link-button"
                  >
                    Search Jobs
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="footer-title">Contact</h3>
              <p className="footer-text">Email: support@jobportal.com</p>
              <p className="footer-text">Phone: (123) 456-7890</p>
            </div>
          </div>
          <p className="footer-copyright">© 2025 JobPortal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;