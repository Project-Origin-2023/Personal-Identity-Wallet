import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import credentialPendingViewModel from '../viewmodel/credentialPending_viewmodel';
import credentialPendingView from '../view/credentialPending_view';

const credentialPendingController = ({ token }) => {
  const viewModel = new credentialPendingViewModel();
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
    <credentialPendingView
      credentialData={credentialData}
      selectedRecord={selectedRecord}
      handleRecordClick={handleRecordClick}
      handleBackButtonClick={handleBackButtonClick}
    />
  );
};

credentialPendingController.propTypes = {
  token: PropTypes.string.isRequired,
};

export default credentialPendingController;
