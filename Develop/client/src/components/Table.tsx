import React, { useState, useEffect } from 'react';
import { Crypto } from '../interfaces/Crypto';

// creating table with react function component
const Table: React.FC = () => {
  // setting all useState hooks for retrieving and loading the data
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  // fetch: async await function retrieving the first 10 crypto currencies from coin market cap
  const fetchCryptoData = async (limit: number, offset: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/crypto?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();
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
    <div>
      <table
        style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Logo</th>
            <th>ID:</th>
            <th>Name</th>
            <th>Price (USD)</th>
            <th>Marketcap</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto, index) => (
            <tr key={crypto.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={crypto.logo}
                  alt={`${crypto.name} logo`}
                  width={30}
                  height={30}
                />
              </td>
              <td>{crypto.symbol}</td>
              <td>{crypto.name}</td>
              <td>${crypto.price.toFixed(2)}</td>
              <td>${crypto.marketCap.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading ? (
        <p>🙏 Loading...</p>
      ) : (
        <button
          onClick={handleLoadMore}
          style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Table;
