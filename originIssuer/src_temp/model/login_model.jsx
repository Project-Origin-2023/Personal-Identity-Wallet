import { useState } from 'react';

function LoginModel() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [requests, setRequests] = useState([]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    requests,
    setRequests,
  };
}

export default LoginModel;
