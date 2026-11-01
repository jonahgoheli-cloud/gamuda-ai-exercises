// API request cleanup

import { useEffect, useState } from "react";

function ApiRequest() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      signal: abortController.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Added a 2-second delay so you can see "Loading..." on screen
        setTimeout(() => {
          setData(data);
        }, 2000);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
        }
      });

    return () => {
      abortController.abort();
    };
  }, []);

 return (
  <div>
    {data ? (
      <div>
        <h3>User ID: {data.userId}</h3>
        <h4>Post #{data.id}</h4>
        <p><strong>Title:</strong> {data.title}</p>
        <p><strong>Body:</strong> {data.body}</p>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
);
}
export default ApiRequest;