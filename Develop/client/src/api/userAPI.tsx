// Purpose: API calls for user authentication
// TAKE NOTE: THIS ASSUMES THE CODE IN utils/auth.tsx HAS BEEN IMPLEMENTED
import AuthService from '../utils/auth';
import { UserData } from '../interfaces/UserData'; // Import the UserData interface

/** Fetches all users from the server.
- Sends a GET request to `/api/users`.
- Includes the user's token in the Authorization header for secure access.
- Returns an array of users if successful or an empty array in case of failure.*/
export const retrieveUsers = async (): Promise<UserData[]> => {
  try {
    const token = AuthService.getToken(); // Retrieve the token from AuthService
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users. Check network tab for details.');
    }

    const data: UserData[] = await response.json(); // Use UserData[] as the type
    return data; // Return the fetched user data
  } catch (error) {
    console.error('Error fetching users:', error);
    return []; // Return an empty array in case of failure
  }
};

/**
Fetches a specific user by ID.
- Sends a GET request to `/api/users/:id`.
- Includes the user's token in the Authorization header for secure access.
- Returns the user's data if successful or null in case of failure. 
 * @param userId - The ID of the user to fetch.
 * @returns The details of the user as a UserData object or null if the request fails.
 */
export const retrieveUserById = async (userId: string): Promise<UserData | null> => {
  try {
    const token = AuthService.getToken(); // Retrieve the token from AuthService
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await fetch(`/api/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user with ID ${userId}.`);
    }

    const data: UserData = await response.json(); // Use UserData as the type
    return data; // Return the fetched user details
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    return null; // Return null in case of failure
  }
};
