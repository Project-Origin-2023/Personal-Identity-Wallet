import { useState } from 'react';

export default function useToken() {
  
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    if(userToken===null){
      sessionStorage.removeItem('token');
      setToken(null)
    }else{
      sessionStorage.setItem('token', JSON.stringify(userToken));
      setToken(userToken.token);  
    }
  };

  return {
    setToken: saveToken,
    token
  };
}