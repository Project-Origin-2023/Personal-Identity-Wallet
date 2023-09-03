import { useState } from 'react';
import axios from 'axios';
import RegisterView from '../view/register_view'; // Assicurati che il percorso sia corretto

function RegisterController() {
  const [familyName] = useState('');
  const [firstName] = useState('');
  const [email,] = useState('');
  const [password] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:19101/register', {
        familyName: familyName,
        firstName: firstName,
        email: email,
        password: password,
      });

      if (response.data.success) {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RegisterView
      handleRegister={handleRegister}
    />
  );
}

export default RegisterController;
