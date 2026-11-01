import { useState, useEffect } from "react";

function NewsAggregator() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchNews() {
            try {
                setLoading(true);
                const res = await fetch("https://juliayxhuang.github.io/florida-man-api/api/headlines.json");

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                // Ensure data.articles exists before setting state
                setArticles(data.articles || data || []); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchNews();
    }, []);

    if (loading) return <div>Loading news...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Latest News</h2>
            <ul>
                {articles.map((article, index) => (
                    <li key={article.id || index}>
                        {article.title || article.headline || JSON.stringify(article)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NewsAggregator;