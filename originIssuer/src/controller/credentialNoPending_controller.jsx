import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import credentialNoPendingViewModel from '../viewmodel/credentialNoPending_viewmodel';
import credentialNoPendingView from '../view/credentialPending_view';

const credentialNoPendingController = ({ token }) => {
  const viewModel = new credentialNoPendingViewModel();
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
    <credentialNoPendingView
      credentialData={credentialData}
      selectedRecord={selectedRecord}
      handleRecordClick={handleRecordClick}
      handleBackButtonClick={handleBackButtonClick}
    />
  );
};

credentialNoPendingController.propTypes = {
  token: PropTypes.string.isRequired,
};

export default credentialNoPendingController;
