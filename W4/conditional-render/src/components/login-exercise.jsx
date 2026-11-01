function UserGreeting({ isLoggedIn, user, onLogin }) {
  if (isLoggedIn) {
    return (
      <div>
        <h1>Welcome back, {user.name}!</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Please log in to continue.</h1>
        {/* The button belongs here inside the return statement */}
        <button 
          onClick={onLogin} 
          style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
        >
          Log In
        </button>
      </div>
    );
  }
}

export default UserGreeting;
