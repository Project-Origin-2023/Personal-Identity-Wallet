//const request = require('supertest');
//const { Routing } = require('../../utils/Routing.js');

const request = require('supertest');
const express = require('express');
const { DataResponse } = require('../../utils/DataResponse'); // Assicurati di importare DataResponse correttamente

// Importa la classe che contiene l'endpoint Express che vuoi testare
const YourExpressApp = require('../../utils/Routing.js'); // Sostituisci con il percorso corretto

const app = express();

// Configura l'app Express e l'endpoint come descritto nel tuo codice
const yourApp = new YourExpressApp(app); // Sostituisci con il percorso corretto

// Test per l'endpoint /auth/login
describe('POST /auth/login', () => {
  it('should return 500 and "email Missing" if email is missing', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ password: 'password123' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual(new DataResponse(false, 'email Missing'));
  });

  it('should return 500 and "password Missing" if password is missing', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual(new DataResponse(false, 'password Missing'));
  });

  it('should return 500 and "email format not valid" if email format is not valid', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'invalid_email', password: 'password123' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual(new DataResponse(false, 'email format not valid'));
  });

  it('should return 500 and "password format not valid" if password format is not valid', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'invalid_password' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual(new DataResponse(false, 'password format not valid'));
  });

  // Aggiungi altri test per verificare il comportamento corretto dell'endpoint in altre situazioni

  it('should return 200 and a valid response if authentication is successful', async () => {
    // Simula una situazione in cui l'autenticazione è valida
    // Assicurati che il test venga eseguito con un utente valido e password valida

    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'valid_email@example.com', password: 'valid_password' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    // Verifica altri dettagli della risposta se necessario
  });
});
































/*describe('POST /auth/register', () => {
  const routing = new Routing();
  routing.configEndpoint();
//test mancanza email su registrazione (OK)
  it('should return 500 with "Email Missing" message if email is missing', async () => {
    const response = await request(routing.app)  // Utilizza l'istanza di Routing
      .post('/auth/register')
      .send({ password: 'password123' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false, message: 'Email Register Missing' });
  });

//test mancanza email su login (OK)
  it('should return 500 with "Email Missing" message if email is missing', async () => {
    const response = await request(routing.app)  // Utilizza l'istanza di Routing
      .post('/auth/login')
      .send({ password: 'password123' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false, message: 'Email Login Missing' });
  });

//test mancanza password su registrazione ()
/*
it('should return 500 with "Password Missing" message if password is missing', async () => {
    const response = await request(routing.app)  // Utilizza l'istanza di Routing
      .post('/auth/register')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false, message: 'Password Register Missing' });
  });
  */


//test mancanza password su login ()
/*it('should return 500 with "Password Missing" message if password is missing', async () => {
    const response = await request(routing.app)  // Utilizza l'istanza di Routing
      .post('/auth/login')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false, message: 'Password Login Missing' });
  });

});

describe('GET /vcsrequests/marital', () => {
    const routing = new Routing();
    routing.configEndpoint();
  
    it('should return 200 with data for non-SysAdmin user', async () => {
        const response = await request(routing.app) 
        .get('/vcsrequest/marital');
        //sicuramente va mandato qualcosa 
        expect(response.status).toBe(500),
        expect(response.body).toEqual({success: false, description: 'Sys_Admin Authorization, lgo in with an User Account' });
    });*/
  
    // ... Altri test simili ...
  
  //});
  