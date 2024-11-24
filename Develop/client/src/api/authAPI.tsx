import { UserLogin } from '../interfaces/UserLogin'; // Define the structure of the login input

/**
 * Login function to authenticate the user.
 * @param userInfo - An object containing username and password.
 * @returns The server response containing user data or token.
 */
const login = async (userInfo: UserLogin) => {
  try {
    // Send POST request to the login endpoint
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate JSON data
      },
      body: JSON.stringify(userInfo), // Convert userInfo object to JSON string
    });

    // Check if the response status is OK (2xx)
    if (!response.ok) {
      const errorData = await response.json(); // Extract error details
      throw new Error(`Error: ${errorData.message}`); // Throw error to be handled below
    }

    // Parse the response JSON data
    const data = await response.json();
    return data; // Return the data (e.g., token or user details)
  } catch (err) {
    console.error('Error during login:', err); // Log error to console
    throw err; // Reject the promise with an error
  }
};

export { login };
