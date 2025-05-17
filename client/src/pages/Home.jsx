import React from "react";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the Notice Analyzer</h1>
      <p>Your one-stop solution for managing tax notices efficiently.</p>
      <p>
        <a href="/notices">View Notices</a> |{" "}
        <a href="/upload">Upload Notice</a>
      </p>
    </div>
  );
};

export default Home;
