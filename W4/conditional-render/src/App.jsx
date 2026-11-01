import { useState } from 'react'
import UserGreeting from './components/login-exercise'
import StatusMessage from './components/StatusMessage'
import Dashboard from './components/Dashboard'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import ProductCatalog from './components/ProductCatalog'
import CommentsSystem from './components/CommentSystem'
import WeatherDashboard from './components/WeatherDashboard'
import TaskManager from './components/TaskManager'

import './components/CommentSystem.css'

function App() {
  // 1. Set up states for login status and loading status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const currentUser = { name: 'Johnny' };
  const error = null; 

  // 2. The login trigger function
  const handleLogin = () => {
    setIsLoggingIn(true); // Turn ON full-screen loading animation

    // Simulate an API network request (e.g., checking credentials)
    setTimeout(() => {
      setIsLoggingIn(false); // Turn OFF animation
      setIsLoggedIn(true);   // Change app view to logged-in dashboard
    }, 2500); // Animation runs for 2.5 seconds
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // 3. SHOW ANIMATION ONLY DURING THE LOGIN PROCESS
  if (isLoggingIn) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#292b3f'
      }}>
        <div style={{ width: '200px', height: '200px' }}>
          <DotLottieReact
            src="/loading.lottie" 
            loop
            autoplay
          />
        </div>
      </div>
    );
  }

  // 4. NORMAL APP VIEW (Shows either Login form or Dashboard)
  return (
    <div>
      {/* Pass the handleLogin function down to your login component */}
      <UserGreeting 
        isLoggedIn={isLoggedIn} 
        user={currentUser} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      
      <StatusMessage isLoading={false} error={error} data={{}} />
      
      {isLoggedIn && ( 
        <>
        <Dashboard />
        <ProductCatalog />
        <CommentsSystem />
        <WeatherDashboard />
        <TaskManager />
        </>
      )}
    </div>
  );
}

export default App;

// function App () {

//   return (
//     <div>
//       <ProductCatalog/>
//     </div>
//   )
// }

// export default App;
