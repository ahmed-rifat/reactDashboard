import React, { createContext, useContext, useState } from 'react';
import { getAuthToken } from '../utils/common';

//create a new context for user information
const UserContext = createContext();

//provider component to wrap around the part of the app that need access to user context
export const UserProvider = ({ children }) => {
  //Initialize the userInfo state with the authenticated user auth
  const [userInfo, setUserInfo] = useState(getAuthToken());

  return (
    // Provide the userInfo and setUserInfo to the context consumers
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

// import React, { createContext, useContext, useState } from 'react';
// import { getAuthToken } from '../utils/common';

// // Create a new context for user information
// const UserContext = createContext();

// // Provider component to wrap around the part of the app that needs access to user context
// export const UserProvider = ({ children }) => {
//   // Initialize the userInfo state with the authenticated user auth (from localStorage, cookies, etc.)
//   const initialUserInfo = getAuthToken() ? JSON.parse(getAuthToken()) : null;

//   const [userInfo, setUserInfo] = useState(initialUserInfo);

//   return (
//     // Provide the userInfo and setUserInfo to the context consumers
//     <UserContext.Provider value={{ userInfo, setUserInfo }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);
