import React from "react";
import AuthFormToggle from "../logins/FormToggle";
import { useAuth } from "../logins/AuthContext";
import "./Home.css"; // You'll add your styling here

const Home = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();

  return (
    <div className="login-page">
      {isAuthenticated ? (
        <div className="login-box" style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "20px" }}>
          <h1>Welcome to EventEase</h1>
          <p>Hello, {currentUser.name}!</p>
          <button className="btn-primary" onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="login-box">
          {/* Left side: Form & Text */}
          <div className="login-left">
            <h1>WELCOME<br />BACK</h1>
            <p>Need an account? <strong>Sign Up</strong></p>

            <AuthFormToggle />

            <div className="social-login">
              <button><img src="/google-icon.svg" alt="Google" /></button>
              <button><img src="/microsoft-icon.svg" alt="Microsoft" /></button>
              <button><img src="/apple-icon.svg" alt="Apple" /></button>
            </div>
          </div>

          {/* Right side: Image */}
          <div className="login-right">
            <img src="src/pages/EVimage/download (1).jpg" alt="Login visual" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
 