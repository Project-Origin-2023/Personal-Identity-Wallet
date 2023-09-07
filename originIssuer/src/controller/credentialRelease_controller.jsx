import { useState, useEffect } from 'react';
import CredentialReleaseView from '../view/credentialRelease_view';
import CredentialReleaseViewModel from '../viewmodel/credentialRelease_viewmodel'; // Assumi che il ViewModel sia stato importato correttamente

const CredentialReleaseController = () => {
  const [credentialData, setCredentialData] = useState({
    credential_request: '',
    currentAddress: '',
    dateOfBirth: '',
    releaseUrl: '',
  });

  const [jwtToken, setJwtToken] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const viewModel = new CredentialReleaseViewModel();

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      // Effettua la richiesta VCS Marital utilizzando il ViewModel
      const response = await viewModel.requestMaritalVCS(jwtToken);

      if (response.success) {
        setIsApproved(response.isApproved);
      } else {
        console.error('Errore durante la richiesta VCS Marital:', response.error);
        alert('Errore durante la richiesta VCS Marital');
      }
    } catch (error) {
      console.error('Errore durante la richiesta VCS Marital:', error);
      alert('Errore durante la richiesta VCS Marital');
    }
  };

  const handleRelease = async (e) => {
    e.preventDefault();
    try {
      // Effettua il rilascio della credenziale utilizzando il ViewModel
      const releaseResponse = await viewModel.releaseVCS(jwtToken);

      if (releaseResponse.success) {
        setCredentialData({ ...credentialData, releaseUrl: releaseResponse.releaseUrl });
      } else {
        console.error('Errore durante il rilascio della credenziale:', releaseResponse.error);
        alert('Errore durante il rilascio della credenziale');
      }
    } catch (error) {
      console.error('Errore durante il rilascio della credenziale:', error);
      alert('Errore durante il rilascio della credenziale');
    }
  };

  useEffect(() => {
    // Inizializza il token JWT qui se necessario
    // setJwtToken('il_tuo_token_jwt');
  }, []);

  return (
    <CredentialReleaseView
      credentialData={credentialData}
      setCredentialData={setCredentialData}
      jwtToken={jwtToken}
      handleRequest={handleRequest}
      handleRelease={handleRelease}
      releaseUrl={credentialData.releaseUrl}
      isApproved={isApproved}
    />
  );
};

export default CredentialReleaseController;
