import axios from 'axios';

async function handleLogin(e, email, password, setRequests) {
  e.preventDefault();
  // Esegui l'elaborazione dell'accesso qui, ad esempio inviando i dati al server
  try {
    // Effettua la chiamata HTTP POST per recuperare le richieste utilizzando email e password
    const response = await axios.post('http://localhost:19001/login', {
      email: email,
      password: password,
    });
    console.log(response);
    // Memorizza le richieste nella lista
    setRequests(response.data);
    if (response.data.email) {
      window.sessionStorage.setItem('user', JSON.stringify(response.data));
    }
  } catch (error) {
    console.log(error);
  }
}

export default handleLogin;
