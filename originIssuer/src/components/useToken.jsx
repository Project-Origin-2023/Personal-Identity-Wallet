import { useState } from 'react';

export default function useToken() {
  
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
  };

  const getIsAdmin = () => {
    const isAdminString = sessionStorage.getItem('isAdmin');
    return Boolean(isAdminString);
  };

  const [token, setToken] = useState(getToken());
  const [isAdmin, setIsAdmin] = useState(getIsAdmin());

  const saveToken = userToken => {
    if(userToken===null){
      saveIsAdmin(null);
      sessionStorage.removeItem('token');
      setToken(null)
    }else{
      sessionStorage.setItem('token', JSON.stringify(userToken));
      setToken(userToken.token);  
    }
  };

  const saveIsAdmin = isA => {
    if(isA===null){
      sessionStorage.removeItem('isAdmin');
      setIsAdmin(null)
    }else{
      sessionStorage.setItem('isAdmin', isA);
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