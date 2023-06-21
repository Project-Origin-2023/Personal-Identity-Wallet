import React, { useState } from 'react';
import axios from 'axios';

function RequestCredential() {
  //const [email, setEmail] = useState(''); //da modificare
  const [token, setXAccessToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYSIsImlhdCI6MTY4NzMzODA5NywiZXhwIjoxNjg3MzQxMDk3fQ.uo2pngmHfhOBY2wYTRKfEs1y_hyZNcN_MmoVEoPk04Y');
  const [dateofbirth, setDateOfBirth] = useState('');
  const [familyname, setFamilyName] = useState('');
  const [firstname, setFirstName] = useState('');
  const [gender, setGender] = useState('');
  const [nameandfamilynameatbirth, setNameAndFamilyNameAtBirth] = useState('');
  const [placeobirth, setPlaceOBirth] = useState('');
  //const [requests, setRequests] = useState([]);

  const handleRetrieve = async (e) => {
    e.preventDefault();

    try {
      //const token = sessionStorage.getItem('token'); // Ottieni il token dal sessionStorage
      // Effettua la chiamata HTTP POST per recuperare le richieste utilizzando PIN e password
      const response = await axios.post('http://localhost:19101/credential/request', {
        dateofbirth: dateofbirth,
        familyname: familyname,
        firstname: firstname,
        gender: gender,
        nameandfamilynameatbirth: nameandfamilynameatbirth,
        placeobirth: placeobirth
      }, {
        headers: {
          'x-access-token': token // Passa il token come header della richiesta
        }
      });

      // Memorizza le richieste nella lista
      //setRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Request Retrieval</h2>
      <form onSubmit={handleRetrieve}>
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
          <input type="text" value={placeobirth} onChange={(e) => setPlaceOBirth(e.target.value)} />
        </label>
        <br/>
        <label>
          Token:
          <input
            type="text"
            value={token}
            onChange={(e) => setXAccessToken(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Request Credential</button>
      </form>
    </div>
  );
}
export default RequestCredential;