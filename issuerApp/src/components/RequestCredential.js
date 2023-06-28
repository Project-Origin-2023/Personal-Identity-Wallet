import React, { useState } from 'react';
import axios from 'axios';

function RequestCredential() {
  const [dateofbirth, setDateOfBirth] = useState('');
  const [familyname, setFamilyName] = useState('');
  const [firstname, setFirstName] = useState('');
  const [gender, setGender] = useState('');
  const [nameandfamilynameatbirth, setNameAndFamilyNameAtBirth] = useState('');
  const [placeofbirth, setPlaceOfBirth] = useState('');

  const handleRequest = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem('token').slice(1,-1); // Ottieni il token dal sessionStorage
      //console.log(token);
      const response = await axios.post('http://localhost:19101/credential/request', {
        dateofbirth: dateofbirth,
        familyname: familyname,
        firstname: firstname,
        gender: gender,
        nameandfamilynameatbirth: nameandfamilynameatbirth,
        placeofbirth: placeofbirth
      }, {
        headers: {
          'x-access-token': token // Passa il token come header della richiesta
        }
      });

      // Memorizza le richieste nella lista
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Request Credential</h2>
      <form onSubmit={handleRequest}>
        <label>
          Date of Birth: 
          <input type="date" value={dateofbirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </label>
        <br/>
        <label>
          Family Name:
          <input type="text" value={familyname} onChange={(e) => setFamilyName(e.target.value)} />
        </label>
        <br/>
        <label>
          First name: 
          <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <br/>
        <label>
          Gender:
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
        </label>
        <br/>
        <label>
          Name and Family Name at Birth:
          <input type="text" value={nameandfamilynameatbirth} onChange={(e) => setNameAndFamilyNameAtBirth(e.target.value)} />
        </label>
        <br/>
        <label>
          Place of Birth: 
          <input type="text" value={placeofbirth} onChange={(e) => setPlaceOfBirth(e.target.value)} />
        </label>
        <br/>
       
        <br />
        <button type="submit">Request Credential</button>
      </form>
    </div>
  );
}
export default RequestCredential;