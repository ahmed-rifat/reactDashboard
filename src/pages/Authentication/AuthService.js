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
      const {data} = await this.api.post('/service/postService', serviceData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  updateService = async (id, serviceData) => {
    try {
      const {data} = await this.api.put(`/service/updateService/${id}`, serviceData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  getServiceById = async (id) => {
    try {
      const {data} = await this.api.get(`/service/services/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  getAllService = async () => {
    try {
      const {data} = await this.api.get('/service/services');
      return data;
    } catch (error) {
      throw error;
    }
  };

  // service Type section

  createServiceType = async (serviceData) => {
    try {
      const {data} = await this.api.post('/service/type', serviceData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  updateServiceType = async (id, serviceData) => {
    try {
      const {data} = await this.api.put(`/service/type/${id}`, serviceData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  getServiceTypeById = async (id) => {
    try {
      const {data} = await this.api.get(`/service/type/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  getAllServiceType = async () => {
    try {
      const {data} = await this.api.get('/service/types');
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Role secion

  createRole = async (roleData) => {
    try {
      const {data} = await this.api.post('/role/insertRole', roleData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  updateRole = async (id, roleData) => {
    try {
      const {data} = await this.api.put(`/role/roles/${id}`, roleData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  getRoleById = async (id) => {
    try {
      const {data} = await this.api.get(`/role/roles/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  getAllRole = async () => {
    try {
      const {data} = await this.api.get('/role/roles');
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Menu section

  createMenu = async (menuData) => {
    try {
      const {data} = await this.api.post('/menu/insertMenu', menuData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  updateMenu = async (id, menuData) => {
    try {
      const {data} = await this.api.put(`/menu/updateMenu/${id}`, menuData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  getMenuById = async (id) => {
    try {
      const {data} = await this.api.get(`/menu/menus/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  getAllMenu = async () => {
    try {
      const {data} = await this.api.get('/menu/menus');
      return data;
    } catch (error) {
      throw error;
    }
  }
  // blog section

  createBlog = async (blogData) => {
    try {
      const {data} = await this.api.post('/blogs/blog', blogData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  updateBlog = async (id, blogData) => {
    try {
      const {data} = await this.api.put(`/blogs/blog/${id}`, blogData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  getBlogById = async (id) => {
    try {
      const {data} = await this.api.get(`/blogs/blog/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  getAllBlogs = async () => {
    try {
      const {data} = await this.api.get('/blogs/blogs');
      return data;
    } catch (error) {
      throw error;
    }
  }
  //user wise Role

  getAllUser = async () => {
    try {
      const {data} = await this.api.get('/users');
      return data;
    } catch (error) {
      throw error;
    }
  }

  getMenuItems = async () => {
    try {
      const {data} = await this.api.get('/menu/active-menus');
      return data;
    } catch (error) {
      throw error;
    }
  }

  // sub menu section
 createSubMenu = async (subMenuData) => {
    try {
      const {data} = await this.api.post('/submenu/submenu', subMenuData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  updateSubMenu = async (id, subMenuData) => {
    try {
      const {data} = await this.api.put(`/submenu/submenu/${id}`, subMenuData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  getSubMenuById = async (id) => {
    try {
      const {data} = await this.api.get(`/submenu/submenu/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  getAllSubMenu = async () => {
    try {
      const {data} = await this.api.get('/submenu/submenus');
      return data;
    } catch (error) {
      throw error;
    }
  }

  getAllActiveMenu = async () => {
    try {
      const {data} = await this.api.get('/menu/active-menus');
      return data;
    } catch (error) {
      throw error;
    }
  }

  // contact section

  getAllContacts = async () => {
    try {
      const {data} = await this.api.get('/contacts/contacts');
      return data;
    } catch (error) {
      throw error;
    }
  }


  // subscription section

  getAllSubscription = async () => {
    try {
      const {data} = await this.api.get('/subcriptions/subcriptions');
      return data;
    } catch (error) {
      throw error;
    }
  }



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
