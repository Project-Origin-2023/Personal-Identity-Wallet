import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ViewCredentialRequestsViewModel from '../view/credentialRequest_view';
import ViewCredentialRequestsView from '../view/credentialRequest_view';

const ViewCredentialRequestsController = ({ token }) => {
  const viewModel = new ViewCredentialRequestsViewModel();
  const [credentialData, setCredentialData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await viewModel.fetchData(token);
      setCredentialData(data);
    };

    fetchData();
  }, [token]);

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
  };

  const handleBackButtonClick = () => {
    setSelectedRecord(null);
  };

  return (
    <ViewCredentialRequestsView
      credentialData={credentialData}
      selectedRecord={selectedRecord}
      handleRecordClick={handleRecordClick}
      handleBackButtonClick={handleBackButtonClick}
    />
  );
};

ViewCredentialRequestsController.propTypes = {
  token: PropTypes.string.isRequired,
};

export default ViewCredentialRequestsController;
