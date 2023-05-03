import React from 'react';

function Home({ currentUser }) {
  return (
    <div>
      <h1>Home</h1>
      {currentUser && (
        <p>Welcome, {currentUser.username}!</p>
      )}
    </div>
  );
}

export default Home;
