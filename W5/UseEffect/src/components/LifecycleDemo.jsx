// import { useEffect, useState } from "react";

// function LifecycleDemo({ userId }) {
//     const [user, setUser] = useState(null);
// };

//     // Mount: Setup
//     useEffect (() => {
//         console.log('Component mounted');

//     // Cleanup function (unmount)
//     return () => {
//         console.log('Component unmounted');
//     };
//    }, []);

//     // Update: When userId changes
//     useEffect (() => {
//         if (!userId) return; 

//         console.log('UserId changed:', userId);

//         fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//       .then((res) => res.json())
//       .then((data) => setUser(data))
//       .catch((err) => console.error('Error fetching user:', err));
//   }, [userId]);

//     // Update: When user data changes
//     useEffect(() => {
//      if (user) {
//         console.log('User data updated:', user);
//         document.title - `Profile: ${user.name}`;
//     }
//     return () => {
//       document.title = "React App"; // Clean up title on unmount or user change
//     };
//    }, [user]);

//    return <div>{user ? user.name : 'Loading...'}</div>

// export default LifecycleDemo

import { useEffect, useState } from 'react';

function LifecycleDemo({ userId }) {
  const [user, setUser] = useState(null);

  // Mount/Unmount lifecycle
  useEffect(() => {
    console.log('Component mounted');

    return () => {
      console.log('Component unmounted');
    };
  }, []);

  // Fetch user data when userId changes
  useEffect(() => {
    if (!userId) return; // Prevent fetching if userId is undefined/null

    console.log('UserId changed:', userId);

    // Fetching user data from an API
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error('Error fetching user:', err));
  }, [userId]);

  // Update document title when user data updates
  useEffect(() => {
    if (user) {
      console.log('User data updated:', user);
      document.title = `Profile: ${user.name}`;
    }
  }, [user]);

  return <div>{user ? user.name : 'Loading...'}</div>;
}

export default LifecycleDemo;