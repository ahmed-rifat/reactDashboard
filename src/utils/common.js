import Cookies from 'js-cookie';
import CryptoJs from 'crypto-js';

//Function to encrypt dat using AES encryption
export const encrypt = (key, data) => {
  return CryptoJs.AES.encrypt(JSON.stringify(data), key).toString();
};

//Function to decrypt dat using AES decryption
export const decrypt = (key, data) => {
  var decryptData = CryptoJs.AES.decrypt(data, key);
  return JSON.parse(decryptData.toString(CryptoJs.enc.Utf8));
};

//Function to set a cookie with encrypted data

export const setCookie = (key, token, user) => {
  // Encrypt and set token
  const encryptedToken = encrypt(key + 'ADMIN@123!', token);
  Cookies.set(`${key}_TOKEN`, encryptedToken, { secure: true, expires: 1 });

  // Encrypt and set user
  const encryptedUser = encrypt(key + 'ADMIN@123!', user);
  Cookies.set(`${key}_USER`, encryptedUser, { secure: true, expires: 1 });
};

// Function to get the token from cookies
export const getToken = (key) => {
  const encryptedToken = Cookies.get(`${key}_TOKEN`); // Get encrypted token
  return encryptedToken ? decrypt(key + 'ADMIN@123!', encryptedToken) : null; // Decrypt and return token
};

// Function to get the user from cookies
export const getUser = (key) => {
  const encryptedUser = Cookies.get(`${key}_USER`); // Get encrypted user
  return encryptedUser ? decrypt(key + 'ADMIN@123!', encryptedUser) : null; // Decrypt and return user object
};


// Function to delete a Cookie
export const deleteCookie = (key) => {
  Cookies.remove(key, { path: '', domain: 'localhost' });
};


export const getAuthToken = () => {
  const token = getToken('_USER_AUTH_');
  const user = getUser('_USER_AUTH_');
  if (token && user) {
    return { token, user }; // Return token and user together
  }
  return null;
};