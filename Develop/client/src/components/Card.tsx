import React from 'react';
import '../../index.css';
import { NewsCardProps } from '../interfaces/NewsCard';

const NewsCard: React.FC<NewsCardProps> = ({ title, description, url, }) => {
    return (
      <div className="card">
        <div className="card-details">
          <h3 className="h3">{title}</h3>
          <p className="p">{description}</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="news-link">
            Read More
          </a>
        </div>
      </div>
    );
  };
  export default NewsCard;