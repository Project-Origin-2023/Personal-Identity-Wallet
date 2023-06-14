import React from 'react';
import useToken from './useToken';

const LogoutButton = () => {
  const { logout } = useToken();

  const handleLogout = () => {
    logout();
    // Aggiungi altre logiche per il logout, come reindirizzamento o pulizia dei dati dell'utente
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;