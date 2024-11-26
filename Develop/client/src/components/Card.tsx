import React, { useEffect, useState } from 'react';
import { NewsCards } from '../interfaces/NewsCard';
import '../index.css';
import moonIcon from '../assets/moon-stars.png';

const mockNews = [
  {
    title: 'Flare Networks to Build A DeFi Hub Powered by Data and Trust',
    description:
      'Flare Networks, an emerging blockchain project, is rapidly shaping the future of decentralized finance (DeFi) The post Flare Networks to Build A D...',
    url: 'https://example.com/article1',
  },
];

const Card: React.FC = () => {
  const [news, setNews] = useState<NewsCards[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        // Simulate a delay to mimic an API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        setNews(mockNews); // Use mock data instead of API response
      } catch (error) {
        console.error('Error fetching mock news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMockData();
  }, []);

  // const fetchNews = async () => {
  //   try {
  //     const newsData = await fetchNewsData(1, 0);
  //     setNews(newsData);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const fetchNewsData = async (limit: number, offset: number) => {
  //   try {
  //     const response = await fetch(
  //       `/news/headlines?filter_entities=true&limit=${limit}&offset=${offset}`
  //     );
  //     if (!response.ok) throw new Error('Unable to fetch News');
  //     const data = await response.json();
  //     return data.articles.map((article: NewsCards) => ({
  //       title: article.title,
  //       description: article.description,
  //       url: article.url,
  //     }));
  //   } catch (error) {
  //     console.error('Unable to fetch News data', error);
  //     return [];
  //   }
  // };

  // useEffect(() => {
  //   fetchNews();
  // }, []);

  return (
    <div>
      <div>
        <h2>Crypto News</h2>
      </div>
      <div>
        {loading ? (
          <li>Loading news...</li>
        ) : (
          news.map((article, index) => (
            <div className="container-tertiary remove-padding">
              <div key={index} className="card">
                <img
                  src={moonIcon}
                  alt="moon-news icon"
                  className="logo-small"
                />
                <div className="card-column">
                  <h3>{article.title}</h3>
                  <p className="news-description">{article.description}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Full Article
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Card;
