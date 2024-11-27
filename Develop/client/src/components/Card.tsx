import React, { useEffect, useState } from 'react';
import '../index.css';
import { NewsCards } from '../interfaces/NewsCard';
import moon from '../assets/Frame 99.png';

const mockNews: NewsCards[] = [
  {
    title: 'Breaking: Cryptocurrency Market Surges',
    description:
      'Ripples XRP is down 6% on Tuesday following record profit-taking among investors as its percentage of total supply in profit reached very high levels in the past week. This follows Ripple Labs donating another $25 million to the pro-crypto Fairshake super PAC...',
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
  //     const newsData = await fetchNewsData(5,0);
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
  //     if (!response.ok)
  //       throw new Error('Unable to fetch News');
  //     const data = await response.json();
  //     return data.articles.map((article: any) => ({
  //       title: article.title,
  //       description: article.descrition,
  //       url: article.url,
  //     }))
  //   } catch (error) {
  //     console.error('Unable to fetch News data', error);
  //     return[];
  //   }
  // };

  // useEffect(() => {
  //   fetchNews();
  // })

  return (
    <div className="container-card">
      <h2>Crypto News</h2>
      <div>
        {loading ? (
          <div>Loading news...</div>
        ) : (
          news.map((article, index) => (
            <div key={index} className="card">
              <img src={moon} className="logo-small" />
              <div className="card-details">
                <p className="text-bold">{article.title}</p>
                <p className="text-subdued">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read Full Article
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Card;
