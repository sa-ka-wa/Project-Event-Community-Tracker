import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { useAuth } from './AuthContext';

const AuthFormToggle = () => {
  const [showLogin, setShowLogin] = useState(true);
  const { currentUser } = useAuth();

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  if (currentUser) {
    return (
      <div className="auth-container">
        <div className="auth-form-container">
          <h2>You are logged in</h2>
          <p>Welcome, {currentUser.name}!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      {showLogin ? (
        <Login onToggleForm={toggleForm} />
      ) : (
        <Register onToggleForm={toggleForm} />
      )}
    </div>
  );
};

export default AuthFormToggle;