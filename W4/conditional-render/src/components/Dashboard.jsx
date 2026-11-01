import { useState } from 'react';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [notifications, setNotifications] = useState([]);

    const login = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Simulate API Call
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (Math.random() > 0.3) { // 70% success rate
                setUser({
                    id: '1',
                    name: 'Johnny Bravo',
                    role: 'admin',
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRNC1mwkTtZdpvYMD2L3kVhS1q5PlfM5BPYLdOPWH9tA&s' 
                });
                setNotifications([
                    {id: 1, message: 'Welcome back!', type: 'success'},
                    {id: 2, message: 'You have 3 pending tasks', type: 'info'}
                ]);
            } else {
                throw new Error('Login failed. Please try again.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setNotifications([]);
        setError(null);
    };

    const dismissNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    return (
        <div className='dashboard'>
            <header>
                <h1>Dashboard</h1>
                {user ? (
                    <div className='user-info' >
                       <center><img src ={user.avatar} alt='Avatar' width='100'/></center>
                        <span> Welcome, {user.name}</span>
                        <button onClick={logout}>Logout</button>
                    </div>
                ) : (
                 <button onClick={login} disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                 </button>
                )}
            </header>

            <main>
                {error && (
                    <div className='error-banner'>
                        <p>❌ {error}</p>
                        <button onClick={() => setError(null)}>x</button>
                    </div>  
                        )}

                        {isLoading && (
                            <div className='loading-spinner'>
                                <p>🔄 Loading...</p>
                            </div>
                        )}

                        {user ? (
                            <div className='dashboard-content'>
                                <h2>Welcome to your dashboard, {user.name}!</h2>

                                {user.role === 'admin' && (
                                    <div className='admin-panel'>
                                        <h3>Admin Controls</h3>
                                        <button>Manage Users</button>
                                        <button>View Analytics</button>
                                        <button>System Settings</button>
                                    </div>
                                )}

                                {notifications.length > 0 && (
                                    <div className='notifications'>
                                        <h3>Notifications ({notifications.length})</h3>
                                        {notifications.map(notification => (
                                         <div
                                         key={notification.id}
                                         className={`notification ${notification.type}`}
                                       >
                                        <span>{notification.message}</span>
                                        <button onClick={() => dismissNotification(notification.id)}>
                                            x
                                        </button>
                                    </div>
                                  ))}
                            </div>
                    )}

                    {notifications.length === 0 && (
                     <p>No new notifications</p>    
                    )}
                 </div>
                ) : (
                    !isLoading && !error && (
                     <div className='welcome message'>
                        <h2>Please log in to access your dashboard</h2>
                        <p>Click the login button to get started</p>
                    </div>
                    )
                )}
            </main>
        </div>
    );
 }

 export default Dashboard


