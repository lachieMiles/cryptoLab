import React, { useEffect, useState } from 'react';
import '../../index.css';
import { NewsCards } from '../interfaces/NewsCard';

const NewsCard: React.FC<NewsCards> = () => {

  const [news, setNews] = useState<NewsCards[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const newsData = await fetchNewsData(5,0);
      setNews(newsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsData = async (limit: number, offset: number) => {
    try {
      const response = await fetch(
        `/news/headlines?filter_entities=true&limit=${limit}&offset=${offset}`
      );
      if (!response.ok)
        throw new Error('Unable to fetch News');
      const data = await response.json();
      return data.articles.map((article: any) => ({
        title: article.title,
        description: article.descrition,
        url: article.url,
      }))
    } catch (error) {
      console.error('Unable to fetch News data', error);
      return[];
    }
  };

  useEffect(() => {
    fetchNews();
  })

  return (
    <nav className="navbar">
      <div className="navbar-brand">Crypto News</div>
      <ul className="navbar-news">
        {loading ? (
          <li>Loading news...</li>
        ) : (
          news.map((article, index) => (
            <li key={index} className="news-item">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <strong>{article.title}</strong>
              </a>
              <p className="news-description">{article.description}</p>
            </li>
          ))
        )}
      </ul>
    </nav>
  );
};
  export default NewsCard;