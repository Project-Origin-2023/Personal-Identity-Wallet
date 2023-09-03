import React, { useState } from 'react';
import axios from 'axios';

const CredentialRequestModel = ({ token }) => {
  const [dateofbirth, setDateOfBirth] = useState('1970-01-01');
  const [familyname, setFamilyName] = useState('');
  const [firstname, setFirstName] = useState('');
  const [gender, setGender] = useState('');
  const [nameandfamilynameatbirth, setNameAndFamilyNameAtBirth] = useState('');
  const [placeofbirth, setPlaceOfBirth] = useState('');

  const requestCredential = async () => {
    try {
      const response = await axios.post('http://localhost:19101/credential/request', {
        dateofbirth: dateofbirth,
        familyname: familyname,
        firstname: firstname,
        gender: gender,
        nameandfamilynameatbirth: nameandfamilynameatbirth,
        placeofbirth: placeofbirth,
      }, {
        headers: {
          'x-access-token': token
        }
      });

      return response.data.message;

    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    dateofbirth,
    setDateOfBirth,
    familyname,
    setFamilyName,
    firstname,
    setFirstName,
    gender,
    setGender,
    nameandfamilynameatbirth,
    setNameAndFamilyNameAtBirth,
    placeofbirth,
    setPlaceOfBirth,
    requestCredential,
  };
};

export default CredentialRequestModel;
