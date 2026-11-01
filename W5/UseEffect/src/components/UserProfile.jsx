import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState({
        user: false,
        posts: false
    });
    const [error, setError] = useState({
        user: null,
        posts: null
    });

    // 1. Fetch user data when userId changes
    useEffect(() => {
        if (!userId) {
            setUser(null);
            return;
        }

        const abortController = new AbortController();

        const fetchUser = async () => {
            setLoading(prev => ({ ...prev, user: true }));
            setError(prev => ({ ...prev, user: null }));

            try {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                const response = await fetch(`/api/users/${userId}`, {
                    signal: abortController.signal
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const userData = await response.json();
                setUser(userData);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(prev => ({ ...prev, user: err.message }));
                }
            } finally {
                setLoading(prev => ({ ...prev, user: false }));
            }
        };

        fetchUser();

        return () => {
            abortController.abort();
        };
    }, [userId]);

    // 2. Fetch user posts when user changes
    useEffect(() => {
        if (!user) {
            setPosts([]);
            return;
        }

        const abortController = new AbortController();

        const fetchPosts = async () => {
            setLoading(prev => ({ ...prev, posts: true }));
            setError(prev => ({ ...prev, posts: null }));

            try {
                await new Promise(resolve => setTimeout(resolve, 800));

                const response = await fetch(`/api/users/${user.id}/posts`, {
                    signal: abortController.signal
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch posts: ${response.status}`);
                }

                const postsData = await response.json();
                setPosts(postsData);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(prev => ({ ...prev, posts: err.message }));
                }
            } finally {
                setLoading(prev => ({ ...prev, posts: false }));
            }
        };

        fetchPosts();

        return () => {
            abortController.abort();
        };
    }, [user]);

    // 3. Update page title when user changes
    useEffect(() => {
        if (user) {
            document.title = `Profile: ${user.name}`;
        } else {
            document.title = `User Profile`;
        }

        return () => {
            document.title = 'React App';
        };
    }, [user]);

    // 4. Mock API setup for development demo
    useEffect(() => {
        const mockUsers = {
            1: { id: 1, name: 'Bob Dylan', email: 'bob@example.com', avatar: 'avatar1.jpg' },
            2: { id: 2, name: 'Marilyn Manson', email: 'mm@example.com', avatar: 'avatar2.jpg' }
        };

        const mockPosts = {
            1: [
                { id: 1, title: 'Hello from the 60s', content: 'Mr. Tambourine Man', date: '1963-01-15' },
                { id: 2, title: 'Hello from the 90s', content: 'Sweet Dreams', date: '2003-01-15' }
            ],
            2: [
                { id: 3, title: 'Rock is the R&B', content: 'Look how good it sounds!', date: '1994-01-17' }
            ]
        };

        const originalFetch = window.fetch;
        window.fetch = async (url, options) => {
            if (options?.signal?.aborted) {
                const error = new Error('The user aborted a request.');
                error.name = 'AbortError';
                throw error;
            }

            if (url.includes('/api/users/') && !url.includes('/posts')) {
                const id = parseInt(url.split('/').pop());
                const userData = mockUsers[id];

                if (userData) {
                    return {
                        ok: true,
                        json: async () => userData
                    };
                } else {
                    return { ok: false, status: 404 };
                }
            }

            if (url.includes('/posts')) {
                const id = parseInt(url.split('/')[3]);
                const postsData = mockPosts[id] || [];

                return {
                    ok: true,
                    json: async () => postsData
                };
            }

            return originalFetch(url, options);
        };

        return () => {
            window.fetch = originalFetch;
        };
    }, []);

    if (!userId) {
        return (
            <div className='user-profile'>
                <p>Please select a user to view their profile.</p>
            </div>
        );
    }

    return (
        <div className='user-profile'>
            <div className='user-section'>
                <h2>User Profile</h2>

                {loading.user && <div className='loading'>Loading user...</div>}

                {error.user && (
                    <div className='error'>
                        Error loading user: {error.user}
                        <button onClick={() => window.location.reload()}>Retry</button>
                    </div>
                )}

                {user && !loading.user && (
                    <div className='user-info'>
                        <img src={user.avatar} alt={user.name} />
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                    </div>
                )}
            </div>

            <div className='posts-section'>
                <h3>User Posts</h3>

                {loading.posts && <div className='loading'>Loading posts...</div>}

                {error.posts && (
                    <div className='error'>
                        Error loading posts: {error.posts}
                    </div>
                )}

                {posts.length > 0 && !loading.posts && (
                    <div className='posts-list'>
                        {posts.map(post => (
                            <div key={post.id} className='post-card'>
                                <h4>{post.title}</h4>
                                <p>{post.content}</p>
                                <small>{post.date}</small>
                            </div>
                        ))}
                    </div>
                )}

                {posts.length === 0 && !loading.posts && !error.posts && user && (
                    <p>No posts found for this user.</p>
                )}
            </div>
        </div>
    );
}

export default UserProfile;