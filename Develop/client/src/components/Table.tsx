import React, { useState, useEffect } from 'react';
import { Crypto } from '../interfaces/Crypto';

// creating table with react function component
const Table: React.FC = () => {
  // setting all useState hooks for retrieving and loading the data
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  // fetch: async await function retrieving the first 10 crypto currencies from coin market cap
  const fetchCryptoData = async (limit: number, start: number) => {
    console.log('Fetching data on page load...');
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/crypto?limit=${limit}&start=${start}`
      );
      const data = await response.json();
      console.log('Data received from API:', data);
      setCryptos((prevCryptos) => [...prevCryptos, ...data]);
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
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
