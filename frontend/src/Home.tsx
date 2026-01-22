// Home.tsx
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
      <h1>Welcome to ChatBot Project</h1>
      <p>This is a demo of React + TypeScript + FastAPI backend.</p>
      <Link to="/chat">
        <button style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
          Go to Chat
        </button>
      </Link>
    </div>
  );
};

export default Home;
