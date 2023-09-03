// CredentialController.js
import React, { useState } from 'react';
import CredentialModel from './CredentialModel';
import CredentialView from './CredentialView';

const CredentialController = ({ token }) => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [credentialData, setCredentialData] = useState([]);

  const handleSelectRecord = (record) => {
    setSelectedRecord(record);
  };

  const handleBackButtonClick = () => {
    setSelectedRecord(null);
  };

  const onDataFetched = (data) => {
    setCredentialData(data);
  };

  return (
    <>
      <CredentialModel token={token} onDataFetched={onDataFetched} />
      <CredentialView
        selectedRecord={selectedRecord}
        onSelectRecord={handleSelectRecord}
        credentialData={credentialData}
        onBackButtonClick={handleBackButtonClick}
      />
    </>
  );
};

export default CredentialController;
