// CredentialModel.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CredentialModel = ({ token, onDataFetched }) => {
  const [credentialData, setCredentialData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:19101/credential/request', {
          headers: {
            'x-access-token': token,
          },
        });

        if (response.data.success) {
          setCredentialData(response.data.result);
          onDataFetched(response.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token, onDataFetched]);

  return null; // This component doesn't render anything on its own
};

export default CredentialModel;
