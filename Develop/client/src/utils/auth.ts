/*typically used for managing authentication state a.k.a. user login/logout */
// get token from local storage
// set token to local storage

import { JwtPayload, jwtDecode } from 'jwt-decode'; //just installed!

class AuthService {
    /**
Decodes the JWT token to get user information.
@returns The decoded token payload or null if no token is found. */
    getProfile(): JwtPayload | null {
      const token = this.getToken();
      if (token) {
        try {
          return jwtDecode<JwtPayload>(token); // Decode the token
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
      return null;
    }
  
    /**
Checks if the user is logged in by validating the token.
@returns True if the token is valid, otherwise false.*/
    loggedIn(): boolean {
      const token = this.getToken();
      return !!token && !this.isTokenExpired(token); // Check if token exists and is not expired
    }
  
    /**
 Checks if the token has expired.
@param token - The JWT token to check.
 @returns True if the token is expired, otherwise false. */
    isTokenExpired(token: string): boolean {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        if (decoded.exp) {
          return Date.now() >= decoded.exp * 1000; // Check if the current time is past the token's expiry
        }
        return false;
      } catch (error) {
        console.error('Error checking token expiration:', error);
        return true;
      }
    }
  
    /**
Retrieves the JWT token from localStorage.
@returns The token as a string or an empty string if not found.*/
    getToken(): string {
      return localStorage.getItem('id_token') || ''; // Replace 'id_token' with your token key
    }
  
    /**
     Saves the JWT token to localStorage.
     @param idToken - The JWT token to save.
     */
    login(idToken: string): void {
      localStorage.setItem('id_token', idToken); // Store the token
      window.location.assign('/'); // Redirect to the homepage
    }
  
    /**
     Logs the user out by removing the token and redirecting to the login page.
     */
    logout(): void {
      localStorage.removeItem('id_token'); // Remove the token
      window.location.assign('/login'); // Redirect to the login page
    }
  }
  
  export default new AuthService();