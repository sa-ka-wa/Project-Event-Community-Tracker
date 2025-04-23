import React from "react";
import { useAuth } from "../logins/AuthContext";

const Home = () => {
  const { currentUser, login, logout, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    const result = await login("demo@example.com", "password123");
    if (result.success) {
      alert("Logged in successfully!");
    } else {
      alert(result.message);
    }
  };

  return (
    <div>
      <h1>Welcome to EventEase</h1>
      {isAuthenticated ? (
        <>
          <p>Hello, {currentUser.name}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <p>Please log in to see your events.</p>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
};

export default Home;
