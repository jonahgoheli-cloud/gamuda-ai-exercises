// src/pages/Home.jsx
function Home() {
  return (
    <div className="container">
      <h1>Welcome to My Website</h1>
      <p>This is standard HTML markup rendered inside React.</p>
      <button onClick={() => alert('Clicked!')}>Click Me</button>
    </div>
  );
}

export default Home