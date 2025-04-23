import React from "react";
import AuthFormToggle from "../logins/FormToggle";
import { useAuth } from "../logins/AuthContext";

const Home = () => {
  const { currentUser, login, logout, isAuthenticated } = useAuth();

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
          <AuthFormToggle />
        </>
      )}
    </div>
  );
};

export default Home;
