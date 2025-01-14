import axios from 'axios';
class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.nextlevelitsolution.com/api/auth',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      xsrfCookieName: 'XSRF-TOKEN',
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
  };
  
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
      const {data} = await this.api.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }  
  };

  isAuthenticated = () => !!this.getToken();

  //faq section

  createFaq = async (faqData) => {
    try {
      const {data} = await this.api.post('/faq/faq', faqData);
      return data;
    } catch (error) {
      throw error;
    }
  };
  updateFaq = async (id, faqData) => {
    try {
      const {data} = await this.api.put(`/faq/faq/${id}`, faqData);
      return data;
    } catch (error) {
      throw error;
    }
  }
  deleteFaq = async (id, faqData) => {
    try {
      const {data} = await this.api.put(`/faq/faq/${id}`, faqData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  getFaq = async () => {
    try {
      const {data} = await this.api.get('/faq/faqs');
      return data;
    } catch (error) {
      throw error;
    }
  }

  getFaqById = async (id) => {
    try {
      const {data} = await this.api.get(`/faq/faq/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

// service section

  createService = async (serviceData) => {
    try {
      const {data} = await this.api.post('/service/type', serviceData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  updateService = async (id, serviceData) => {
    try {
      const {data} = await this.api.put(`/service/type/${id}`, serviceData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  getServiceById = async (id) => {
    try {
      const {data} = await this.api.get(`/service/type/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  getService = async () => {
    try {
      const {data} = await this.api.get('/service/types');
      return data;
    } catch (error) {
      throw error;
    }
  };

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
