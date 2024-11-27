import { useState, FormEvent, ChangeEvent } from 'react';
import Auth from '../utils/auth';
import { login } from '../api/authAPI';
import Navbar from '../components/Navbar'; // Import the navigation bar
import logo from '../assets/logo.png'; // Import the logo
import '../index.css';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null); // Error state
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!loginData.username || !loginData.password) {
      setError('Both username and password are required.');
      return;
    }

    try {
      setLoading(true);
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
      setError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/*navigation bar */}
      <Navbar />
      <div className="container-form">
        {/* Logo and Title */}
        <div className="container-logo">
          <img id="logo" src={logo} alt="CryptoLab Logo" className="logo-big" />
          <h1>CryptoLab</h1>
        </div>

        {/* Login Form */}
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="wrapper-inputs reduce-margin">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              className="input-primary"
              value={loginData.username}
              onChange={handleChange}
              placeholder="😯 JohnSmith..."
            />
          </div>
          <div className="wrapper-inputs">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="input-primary"
              value={loginData.password}
              onChange={handleChange}
              placeholder="🤫 password..."
            />
          </div>
          {error && <p className="text-subdued error-message">{error}</p>}
          <button
            type="submit"
            className="button-full-width"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
