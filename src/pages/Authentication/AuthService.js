import axios from 'axios';
class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  login = async (loginData) => {
    try {
      const { data } = await this.api.post('/login', loginData);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return data;
    } catch (error) {
      throw error;
    }
  };

  register = async (registerData) => { 
    try {
      const { data } = await this.api.post('/register', registerData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  getToken = () => localStorage.getItem('token');

  getUser = async(userId) => {
    try {
      const response = await this.api.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }  
  };

  isAuthenticated = () => !!this.getToken();

  create = async (url, data) => {
    try {
      const response = await this.api.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  read = async (url) => {
    try {
      const response = await this.api.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  update = async (url, data) => {
    try {
      const response = await this.api.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  delete = async (url) => {
    try {
      const response = await this.api.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

const authService = new AuthService();
export default authService;
