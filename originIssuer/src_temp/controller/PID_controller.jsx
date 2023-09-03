import React from 'react';
import CredentialRequestModel from './CredentialRequestModel';
import CredentialRequestView from './CredentialRequestView';

const CredentialRequestController = ({ token }) => {
  const {
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
  } = CredentialRequestModel({ token });

  const handleRequest = async (e) => {
    e.preventDefault();
    const message = await requestCredential();
    if (message) {
      alert(message);
    }
  };

  return (
    <CredentialRequestView
      dateofbirth={dateofbirth}
      setDateOfBirth={setDateOfBirth}
      familyname={familyname}
      setFamilyName={setFamilyName}
      firstname={firstname}
      setFirstName={setFirstName}
      gender={gender}
      setGender={setGender}
      nameandfamilynameatbirth={nameandfamilynameatbirth}
      setNameAndFamilyNameAtBirth={setNameAndFamilyNameAtBirth}
      placeofbirth={placeofbirth}
      setPlaceOfBirth={setPlaceOfBirth}
      requestCredential={requestCredential}
      handleRequest={handleRequest}
    />
  );
};

export default CredentialRequestController;
