// model/UserModel.js
import axios from 'axios';

const registerUser = async (familyName, firstName, email, password) => {
  try {
    const response = await axios.post('http://localhost:19101/register', {
      familyName,
      firstName,
      email,
      password,
    });

    if (response.data.success) {
      return response.data.message;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export default { registerUser };
