import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoDark from '../../images/logo/NextLevelIT.jpg';
import Logo from '../../images/logo/NextLevelIT_dark.png';
import authService from '../Authentication/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loginImg from '../../images/logo/loginImg.png';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { setCookie } from '../../utils/common.js';
import { useUser } from '../../contexts/UserContext';

import {
  faEyeSlash,
  faEye,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const { userInfo, setUserInfo } = useUser({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setloginData({ ...loginData, [name]: value });
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(loginData);
      if (response?.message) {
        toast.success(response.message, {
          position: 'top-right',
          autoClose: 1000,
          theme: 'light',
        });
      }
      setTimeout(() => {
        const { token, user } = response;
       // setCookie('_USER_AUTH_', token, user);
        localStorage.setItem('_USER_AUTH_', JSON.stringify({ token, user }));
        setUserInfo(user);
        navigate('/dashboard');
      }, 1000);
    } catch {
      if (response?.message) {
        toast.error(response.message, {
          position: 'top-right',
          autoClose: 1000,
          theme: 'light',
        });
      }
    }
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-xl">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="min-h-screen px-26 text-center">
              <Link className="mt-10 inline-block" to="/">
                <img className="hidden dark:block" src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" />
              </Link>

              <p className="2xl:px-20">
                Log in to your account to continue using Next Level IT
                Solutions.
              </p>

              <span className="mt-15 inline-block ms-55">
                <img src={loginImg} alt="login" className="h-1/2 w-2/4" />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Next Level IT Solutions
              </h2>

              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="6+ Characters, 1 Capital letter"
                      value={loginData.password}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span
                      className="absolute right-4 top-4"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>
                <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{' '}
                    <Link to="/auth/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignIn;
