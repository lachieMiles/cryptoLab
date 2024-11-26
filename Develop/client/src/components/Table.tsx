import React, { useState, useEffect } from 'react';
import { Crypto } from '../interfaces/Crypto';
import AuthService from '../utils/auth';

// creating table with react function component
const Table: React.FC = () => {
  // setting all useState hooks for retrieving and loading the data
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  // fetch: async await function retrieving the first 10 crypto currencies from coin market cap
  const fetchCryptoData = async (limit: number, start: number) => {
    console.log('Fetching data from API...');
    setLoading(true);
  
    try {
      // Retrieve token from AuthService
      const token = AuthService.getToken();
      if (!token) {
        throw new Error('Authentication token is missing. Please log in.');
      }
  
      // Fetch data from API with Authorization header
      const response = await fetch(
        `http://localhost:3001/api/crypto?limit=${limit}&start=${start}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include token
          },
        }
      );
  
      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch crypto data');
      }
  
      // Parse and validate response data
      const data = await response.json();
      console.log('Data received from API:', data);
  
      if (!Array.isArray(data)) {
        throw new Error('Unexpected response format. Expected an array.');
      }
  
      setCryptos((prevCryptos) => [...prevCryptos, ...data]); // Append new data
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching cryptocurrency data:', error.message);
      } else {
        console.error('Error fetching cryptocurrency data:', error);
      }
      // Handle error (e.g., show error message or redirect to login)
    } finally {
      setLoading(false);
    }
  };

  // defining the the parameters for the fetch function with useEffect, setting [] to load once on page load
  useEffect(() => {
    fetchCryptoData(10, 0);
  }, []);

  // defining the load more button which loads an additional 10 cryptos using offset hook
  const handleLoadMore = () => {
    const newOffset = offset + 10;
    setOffset(newOffset);
    fetchCryptoData(10, newOffset);
  };

  return (
    <div className="container-secondary">
      <table
        style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>ID:</th>
            <th>Name:</th>
            <th>Price:</th>
            <th>Marketcap:</th>
            <th>Saved:</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto, index) => (
            <tr key={crypto.id}>
              <td>
                <div className="div-horizontal">
                  {index + 1}.{' '}
                  <img
                    className="crypto-logo"
                    src={crypto.logo}
                    alt={`${crypto.name} logo`}
                    width={30}
                    height={30}
                  />
                </div>
              </td>
              <td>{crypto.symbol}</td>
              <td>{crypto.name}</td>
              <td>${crypto.price.toFixed(2)}</td>
              <td>${crypto.marketCap.toFixed(2)}</td>
              <td className="no-padding">
                <button className="button-like">❤️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading ? (
        <p>🙏 Loading...</p>
      ) : (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default Table;