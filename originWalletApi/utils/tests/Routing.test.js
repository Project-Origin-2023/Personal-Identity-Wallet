const request = require('supertest');
const { Routing } = require('../../utils/Routing.js');
const routing = new Routing();
routing.configEndpoint();




//test mancanza email su registrazione (OK)
it('should return 500 with "Email Missing" message if email is missing', async () => {
  const response = await request(routing.app)  // Utilizza l'istanza di Routing
    .post('/auth/register')
    .send({ password: 'password123' });

  expect(response.status).toBe(500);
  expect(response.body).toEqual({ success: false, description: "email Missing" });
});
//test mancanza password su registrazione () 
it('should return 500 with "Password Missing" message if password is missing', async () => {
  const response = await request(routing.app)  // Utilizza l'istanza di Routing
    .post('/auth/register')
    .send({ email: 'test@example.com' });

  expect(response.status).toBe(500);
  expect(response.body).toEqual({ success: false, description: 'password Missing' });
});
//test formato email su registrazione (OK)
it('should return 500 with "Email Format" message if email is not valid', async () => {
  const response = await request(routing.app)  // Utilizza l'istanza di Routing
    .post('/auth/register')
    .send({ email: 'testexample.com', password: 'password123' });
    
  expect(response.status).toBe(500);
  expect(response.body).toEqual({ success: false, description: 'email format not valid' });
});
//test formato password su registrazione (OK)
it('should return 500 with "Password Format" message if password is not valid', async () => {
  const response = await request(routing.app)  // Utilizza l'istanza di Routing
    .post('/auth/register')
    .send({ email: 'test@example.com', password: 'password' });

  expect(response.status).toBe(500);
  expect(response.body).toEqual({ success: false, description: 'password format not valid' });
});


//test registrazione che va a buon fine (OK)
it('should return 200 with "Registration Successful" message if registration is successful', async () => {
   // Utilizza l'istanza di Routing
  const crypto = require('crypto');
  const email = crypto.randomUUID()+"@gmail.com";
  const password = "1234abc!A";
  const response = await request(routing.app) 
    .post('/auth/register')
    .send({ email: email, password: password });
  expect(response.status).toBe(200); 
});

//test registrazione con email già presente (OK)
it('should return 500 with "Email Already Exists" message if email is already present', async () => {
  const crypto = require('crypto');
  const email = crypto.randomUUID()+"@gmail.com";
  const password = "1234abc!A";
  const response = await request(routing.app)  // Utilizza l'istanza di Routing
    .post('/auth/register')
    .send({ email: email, password: password });
  expect(response.status).toBe(200);
  const response2 = await request(routing.app)  // Utilizza l'istanza di Routing
    .post('/auth/register')
    .send({ email: email, password: password });
  expect(response2.status).toBe(500);
  expect(response2.body.success).toEqual(false );
});

//test di login con email non presente (OK)
it('should return 500 with "Email Not Found" message if email is not present', async () => {
  const crypto = require('crypto');
  const email = crypto.randomUUID()+"@gmail.com";
  const password = "1234abc!A";
  const response = await request(routing.app)  // Utilizza l'istanza di Routing
    .post('/auth/login')
    .send({ email: email, password: password });
  expect(response.status).toBe(500);
  expect(response.body).toEqual({ success: false, description: 'Account Does Not exist' });
});

//test di login con password non corretta (OK)
it('should return 500 with "Password Not Correct" message if password is not correct', async () => {
  const crypto = require('crypto');
  const email = crypto.randomUUID()+"@gmail.com";
  const password = "1234abc!A";
  const response = await request(routing.app)  // Utilizza l'istanza di Routing
    .post('/auth/register')
    .send({ email: email, password: password });
  expect(response.status).toBe(200);
  const response2 = await request(routing.app)  // Utilizza l'istanza di Routing
    .post('/auth/login')
    .send({ email: email, password: password+"not" });
  expect(response2.status).toBe(500);
  expect(response2.body).toEqual({ success: false, description: 'Password is not correct' });
});

//test di login con email e password corretti (OK)
it('should return 200 with "Login Successful" message if login is successful', async () => {
  const crypto = require('crypto');
  const email = crypto.randomUUID()+"@gmail.com";
  const password = "1234abc!A";
  const response = await request(routing.app)  // Utilizza l'istanza di Routing
    .post('/auth/register')
    .send({ email: email, password: password });
  expect(response.status).toBe(200);
  const response2 = await request(routing.app)  // Utilizza l'istanza di Routing
    .post('/auth/login')
    .send({ email: email, password: password });
  expect(response2.status).toBe(200);
});







/*describe('register and login email and password presence', () => {
  
  //test mancanza email su registrazione (OK)
  it('should return 500 with "Email Missing" message if email is missing', async () => {
    const response = await request(routing.app)  // Utilizza l'istanza di Routing
      .post('/auth/register')
      .send({ password: 'password123' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false, description: "email Missing" });
  });

  //test mancanza email su login (OK)
  it('should return 500 with "Email Missing" message if email is missing', async () => {
    const response = await request(routing.app)  // Utilizza l'istanza di Routing
      .post('/auth/login')
      .send({ password: 'password123' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false, description: "email Missing" });
  });

  //test mancanza password su registrazione ()
  it('should return 500 with "Password Missing" message if password is missing', async () => {
    const response = await request(routing.app)  // Utilizza l'istanza di Routing
      .post('/auth/register')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false, description: 'password Missing' });
  });

  //test mancanza password su login ()
  it('should return 500 with "Password Missing" message if password is missing', async () => {
    const response = await request(routing.app)  // Utilizza l'istanza di Routing
      .post('/auth/login')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false, description: "password Missing" });
  });
});

describe('simulate a registration flow and a complete user experience', () => {
  //Create a random email and a fixed password
  const crypto = require('crypto');
  const email = crypto.randomUUID()+"@gmail.com";
  const password = "1234abc!A";
  let token;
  //Register
  it('should register a user and return a token', async () => {
    const response = await request(routing.app)  // Utilizza l'istanza di Routing
    .post('/auth/register')
    .send({ email: email, password: password });

    const data = response.body.data;
    const body = response.body;
    //memorize token received
    token = data.token;
    // Assicurati che la registrazione sia avvenuta con successo
    expect(body.success).toBe(true);
    expect(body.description).toBe('Auth Login Successfuly Token created');
    expect(data).toBeDefined();
    
    // Verifica che il token sia una stringa non vuota
    expect(typeof data.token).toBe('string');
    expect(data.token.length).toBeGreaterThan(0);
  });

  //Login
  it('should login a user and return a token', async () => {
    const response = await request(routing.app)  // Utilizza l'istanza di Routing
    .post('/auth/login')
    .send({ email: email, password: password });

    const data = response.body.data;
    const body = response.body;
    //memorize token received
    token = data.token;
    // Assicurati che la registrazione sia avvenuta con successo
    expect(body.success).toBe(true);
    expect(body.description).toBe('Auth Login Successfuly Token created');
    expect(data).toBeDefined();
    
    // Verifica che il token sia una stringa non vuota
    expect(typeof data.token).toBe('string');
    expect(data.token.length).toBeGreaterThan(0);
  });
  //Login password is not correct
  it('should return an error for incorrect password', async () => {
    const response = await request(routing.app)  // Utilizza l'istanza di Routing
    .post('/auth/login')
    .send({ email: email, password: password+"not" });

    const body = response.body;
    // Assicurati che la registrazione sia avvenuta con successo
    expect(body.success).toBe(false);
    expect(body.description).toBe('Password is not correct');
  });

  //Rquest PID
  it('should create a VCS request PID', async () => {
    const response = await request(routing.app)
    .post('/vcsrequest/pid')
    .set('x-access-token', token)
    .send({
      currentAddress: 'Indirizzo attuale',
      dateOfBirth: '01 01 1990',
      familyName: 'Cognome',
      firstName: 'Nome',
      gender: 'M',
      nameAndFamilyNameAtBirth: 'Nome e cognome di nascita',
      personalIdentifier: '123456789',
      placeOfBirth: 'Luogo di nascita',
    });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
  //Request PID token not found
  it('should return an error for missing token', async () => {
    const response = await request(routing.app)
      .post('/vcsrequest/pid')
      .send({
        currentAddress: 'Indirizzo attuale',
        dateOfBirth: '1990-01-01',
        familyName: 'Cognome',
        firstName: 'Nome',
        gender: 'M',
        nameAndFamilyNameAtBirth: 'Nome e cognome di nascita',
        personalIdentifier: '123456789',
        placeOfBirth: 'Luogo di nascita',
      });

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.description).toBe('Authorization token not found');
    });
    //request marital status
    it('should create a VCS request marital', async () => {
      const response = await request(routing.app)
      .post('/vcsrequest/marital')
      .set('x-access-token', token)
      .send({
        status: 'married', // married, divorced, single
      personalIdentifier: '123456789' //
      });
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    //request marital status token not found
    it('should return an error for missing token', async () => {
      const response = await request(routing.app)
        .post('/vcsrequest/marital')
        .send({
          status: 'married', // married, divorced, single
        personalIdentifier: '123456789' //
        });
  
      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.description).toBe('Authorization token not found');
      }
    );
    
});*/



































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
  