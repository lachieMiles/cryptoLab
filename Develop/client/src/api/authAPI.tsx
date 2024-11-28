import { UserLogin } from '../interfaces/UserLogin';


const API_BASE_URL = 'http://localhost:3001'; // Dynamic backend URL


const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch(`https://cryptolab-rc3l.onrender.com`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.error('Error from user login:', err);
    return Promise.reject('Could not fetch user info');
  }
};

export { login };
