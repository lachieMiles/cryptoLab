import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
  
    const token = this.getToken();
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded;
    }
    return null;
  }

  loggedIn() {
 
    const token = this.getToken();
    if (!token) {
      return false;
    }

    return !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      if (decoded.exp) {
        return Date.now() >= decoded.exp * 1000;
      }
      return false;
    } catch (error) {
      console.error('Error decoding token', error);
      return true;
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/dashboard');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
