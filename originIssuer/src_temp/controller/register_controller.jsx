// controller/RegisterController.js
import React from 'react';
import UserModel from '../model/UserModel';
import RegisterView from '../view/RegisterView';

const RegisterController = () => {
  const handleRegister = async (familyName, firstName, email, password) => {
    try {
      const message = await UserModel.registerUser(familyName, firstName, email, password);
      return message;
    } catch (error) {
      throw error;
    }
  };

  return <RegisterView onRegister={handleRegister} />;
};

export default RegisterController;
