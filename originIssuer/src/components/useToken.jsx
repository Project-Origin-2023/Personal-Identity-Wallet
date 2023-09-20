import { useState } from 'react';

export default function useToken() {
  
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
  };

  const getIsAdmin = () => {
    const isAdminString = localStorage.getItem('isAdmin');
    return JSON.parse(isAdminString);
  };

  const [token, setToken] = useState(getToken());
  const [isAdmin, setIsAdmin] = useState(getIsAdmin());

  const saveToken = userToken => {
    if(userToken===null){
      saveIsAdmin(null);
      localStorage.removeItem('token');
      setToken(null)
    }else{
      localStorage.setItem('token', JSON.stringify(userToken));
      setToken(userToken);  
    }
  };

  const saveIsAdmin = isA => {
    if(isA===null){
      localStorage.removeItem('isAdmin');
      setIsAdmin(null)
    }else{
      localStorage.setItem('isAdmin', isA);
      setIsAdmin(isA);  
    }
  };


  return {
    setToken: saveToken,
    token,
    isAdmin,
    setIsAdmin: saveIsAdmin
  };
}