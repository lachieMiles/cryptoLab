import dotenv from 'dotenv';
dotenv.config();

interface Article {
  title: string;
  snippet: string;
  link: string;
}

class NewsService {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = process.env.MA_BASE_URL || '';
    this.apiKey = process.env.MA_API_KEY || '';
  }

  // Build query for the MarketAUX API
  private buildQuery(): string {
    return `${this.baseURL}/news/all?filter_entities=true&language=en&api_token=${this.apiKey}`;
    // old Query `${this.baseURL}/news/headlines?filter_entities=true&limit=1`;
  }

  // Fetch data from MarketAUX API
  private async fetchFromAPI(query: string): Promise<any> {
    try {
      const response = await fetch(query, {
        method: 'GET',
        headers: {
          'X-API-KEY': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching data from MarketAUX API:', error);
      throw error;
    }
  }

  // Parse the response to extract the article details
  private parseArticle(data: any): Article {
    const article = data?.data?.[0];
    if (!article) {
      throw new Error('No articles found');
    }

    return {
      title: article.title,
      snippet: article.snippet || '', // Optional field
      link: article.url,
    };
  }

  // Public method to fetch the latest article
  async getLatestArticle(): Promise<Article> {
    try {
      const data = await this.fetchFromAPI(this.buildQuery());
      return this.parseArticle(data);
    } catch (error) {
      console.error('Error retrieving the latest article:', error);
      throw error;
    }
  }
}

export default new NewsService();
