import dotenv from 'dotenv';
dotenv.config();

interface Crypto {
  id: number;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  logo: string;
}

class Crypto {
  constructor(
    public id: number,
    public name: string,
    public symbol: string,
    public price: number,
    public marketCap: number,
    public logo: string
  ) {
    this.id = id;
    this.name = name;
    this.symbol = symbol;
    this.price = price;
    this.marketCap = marketCap;
    this.logo = logo;
  }
}

class CryptoService {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = process.env.CMC_BASE_URL || '';
    this.apiKey = process.env.CMC_API_KEY || '';
  }

  // Build query for the cryptocurrency listings API
  private buildListingsQuery(start: number, limit: number): string {
    return `${this.baseURL}/cryptocurrency/listings/latest?start=${start}&limit=${limit}&convert=USD`;
  }

  // Build query for the cryptocurrency info API
  private buildInfoQuery(ids: string): string {
    return `${this.baseURL}/cryptocurrency/info?id=${ids}`;
  }

  // Fetch data from CoinMarketCap API
  private async fetchFromAPI(query: string): Promise<any> {
    try {
      console.log('api key test', this.apiKey);
      const response = await fetch(query, {
        method: 'GET',
        headers: {
          'X-CMC_PRO_API_KEY': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching data from API:', error);
      throw error;
    }
  }

  // Parse cryptocurrency listings
  private parseCryptoListings(data: any[]): Crypto[] {
    return data.map(
      (crypto: any) =>
        new Crypto(
          crypto.id,
          crypto.name,
          crypto.symbol,
          crypto.quote.USD.price,
          crypto.quote.USD.market_cap,
          '' // Placeholder for logo, to be fetched separately
        )
    );
  }

  // Combine listings and logos
  private async fetchAndCombineData(
    start: number,
    limit: number
  ): Promise<Crypto[]> {
    const listingsData = await this.fetchFromAPI(
      this.buildListingsQuery(start, limit)
    );
    const parsedListings = this.parseCryptoListings(listingsData.data);

    // Fetch logos
    const ids = parsedListings.map((crypto) => crypto.id).join(',');
    const infoData = await this.fetchFromAPI(this.buildInfoQuery(ids));

    return parsedListings.map((crypto) => {
      const logo = infoData.data[crypto.id]?.logo || '';
      return new Crypto(
        crypto.id,
        crypto.name,
        crypto.symbol,
        crypto.price,
        crypto.marketCap,
        logo
      );
    });
  }

  // Public method to fetch cryptocurrencies with pagination
  async getCryptos(start: number, limit: number): Promise<Crypto[]> {
    try {
      return await this.fetchAndCombineData(start, limit);
    } catch (error) {
      console.error('Error retrieving cryptocurrencies:', error);
      throw error;
    }
  }
}

export default new CryptoService();
