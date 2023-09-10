const { Authentication } = require('../authentication/Authentication'); // Assicurati che il percorso sia corretto
const { DataResponse } = require('../DataResponse');
const request = require('supertest');
const { Routing } = require('../../utils/Routing.js');
const routing = new Routing();
routing.configEndpoint();
var token;

describe('Authentication Registration', () => {
  let auth;

  beforeAll(() => {
    // Inizializza l'istanza di Authentication con valori appropriati
    auth = new Authentication('yourSecretKey', 3600); // Modifica con i valori desiderati
  });
//REGISTRAZIONE
  it('should register a user and return a token', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    const registrationResult = await auth.register(email, password);

    // Assicurati che la registrazione sia avvenuta con successo
    expect(registrationResult.success).toBe(true);
    expect(registrationResult.description).toBe('Auth Login Successfuly Token created');
    expect(registrationResult.data).toBeDefined();
    
    // Verifica che il token sia una stringa non vuota
    expect(typeof registrationResult.data).toBe('string');
    expect(registrationResult.data.length).toBeGreaterThan(0);

    // Puoi anche verificare ulteriormente il token se lo desideri
    console.debug('Token:', registrationResult.data);
    token = registrationResult.data;
    console.debug('Token 2:', token);

    // Ora puoi utilizzare questo token per effettuare altre richieste
});

it('should return an error for an existing email', async () => {
    // Inserisci un'email che esiste già nel sistema per testare il caso in cui l'email è già registrata
    const email = 'existing@example.com';
    const password = 'password123';

    const registrationResult = await auth.register(email, password);

    // Assicurati che la registrazione restituisca un errore in questo caso
    expect(registrationResult.success).toBe(false);
    expect(registrationResult.description).toBe('User account insertion failed'); // Modifica il messaggio in base alla tua implementazione
  });
//LOGIN
it('should log in a user and return a token', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    // Prima di eseguire il test, dovresti registrare un utente con questa email nel tuo database
    // Per il test di login, assicurati che l'utente sia stato registrato con successo

    const loginResult = await auth.login(email, password);

    // Assicurati che il login sia avvenuto con successo
    expect(loginResult.success).toBe(true);
    expect(loginResult.description).toBe('Auth Login Successfuly Token created');
    
    // Verifica che il token sia una stringa non vuota
    expect(typeof loginResult.data).toBe('string');
    expect(loginResult.data.length).toBeGreaterThan(0);

    // Puoi anche verificare ulteriormente il token se lo desideri
    token = loginResult.data;

    // Ora puoi utilizzare questo token per effettuare altre richieste
  });

  it('should return an error for incorrect password', async () => {
    const email = 'test@example.com';
    const password = 'incorrectpassword';

    // Prima di eseguire il test, dovresti registrare un utente con questa email nel tuo database
    // Per il test di login, assicurati che l'utente sia stato registrato con successo

    const loginResult = await auth.login(email, password);

    // Assicurati che il login restituisca un errore in questo caso
    expect(loginResult.success).toBe(false);
    expect(loginResult.description).toBe('Password is not correct');
  });
//RICHIESTA PID
describe('Authentication Endpoint Tests', () => {
    it('should create a VCS request PID', async () => {
        const loginResult = await auth.register('test@example.com', 'password123');
        const token = loginResult.data;
      const response = await request(routing.app)
        .post('/vcsrequest/pid')
        .set('x-access-token', token)
        .send({
          currentAddress: 'Indirizzo attuale',
          dateOfBirth: '1990-01-01',
          familyName: 'Cognome',
          firstName: 'Nome',
          gender: 'Maschio',
          nameAndFamilyNameAtBirth: 'Nome e cognome di nascita',
          personalIdentifier: '123456789',
          placeOfBirth: 'Luogo di nascita',
        });
  
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
  
      // Verifica ulteriori dettagli della risposta se necessario
    });
  
    it('should return an error for missing token', async () => {
      const response = await request(routing.app)
        .post('/vcsrequest/pid')
        .send({
          currentAddress: 'Indirizzo attuale',
          dateOfBirth: '1990-01-01',
          familyName: 'Cognome',
          firstName: 'Nome',
          gender: 'Maschio',
          nameAndFamilyNameAtBirth: 'Nome e cognome di nascita',
          personalIdentifier: '123456789',
          placeOfBirth: 'Luogo di nascita',
        });
  
      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.description).toBe('Authorization token not found');
  
      // Verifica ulteriori dettagli della risposta se necessario
    });
  
    // Puoi aggiungere altri test a seconda delle diverse condizioni possibili
  });
  
});
