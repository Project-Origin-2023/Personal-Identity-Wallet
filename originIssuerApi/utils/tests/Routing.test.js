const request = require('supertest');
const { Routing } = require('../../utils/Routing.js');
const routing = new Routing();
routing.configEndpoint();


let primoId;

describe('register and login email and password presence', () => {
  
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
      dateOfBirth: '1990 01 01',
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

    //request marital status personalIdentifier not found
    it('should return an error for missing personalIdentifier', async () => {
      const response = await request(routing.app)
        .post('/vcsrequest/marital')
        .set('x-access-token', token)
        .send({
          status: 'married', // married, divorced, single
        });
  
      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.description).toBe('personalIdentifier Missing');
      }
    );
    var tokenAdmin;
    //login whit sys admin
    it('should login a user and return a token', async () => {
      const response = await request(routing.app)  // Utilizza l'istanza di Routing
      .post('/auth/login')
      .send({ email: "ADMIN@admin.com", password: "ADmin1234?" });
      
    const data = response.body.data;
    const body = response.body;
    //memorize token received
    tokenAdmin = data.token;
    // Assicurati che la registrazione sia avvenuta con successo
    expect(body.success).toBe(true);
    expect(body.description).toBe('Auth Login Successfuly Token created');
    expect(data).toBeDefined();
    });

    //admin retrieve all vcs request
    it('should return all vcs request', async () => {
      const response = await request(routing.app)
      .get('/admin/vcsrequests/pending')
      .set('x-access-token', tokenAdmin);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      primoId = response.body.data.vcs_requests_pending[0].id;
    });
    //admin retrieve all vcs request token not found
    it('should return an error for missing token', async () => {
      const response = await request(routing.app)
        .get('/admin/vcsrequest/pid/');
  
      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.description).toBe('Authorization token not found');
      }
    );
    //admin approve vcs request
       //admin approve vcs request
       it('should approve a vcs request for either marital or PID', async () => {
        // Crea un nuovo ID per il test
        const responseArray = await Promise.all([
          request(routing.app)
            .get(`/admin/vcsrequest/marital/${primoId}`)
            .set('x-access-token', tokenAdmin),
          request(routing.app)
            .get(`/admin/vcsrequest/pid/${primoId}`)
            .set('x-access-token', tokenAdmin)
        ]);
      
        // Verifica che almeno una delle due risposte abbia uno stato 200
        const atLeastOneSuccess = responseArray.some(response => response.status === 200);
      
        // Verifica che almeno una delle due risposte abbia avuto successo (status 200)
        expect(atLeastOneSuccess).toBe(true);
      });



  //admin verify vcs request
  it('should verify a VCS request', async () => {
    primoId = primoId.toString();
    const requestBody = {
      vcsrequestId: primoId, // Sostituisci con l'ID effettivo
      status: true, // Sostituisci con lo stato effettivo
    };
  //print type of primoId
    const response = await request(routing.app)
      .post('/admin/vcsrequest/verify')
      .set('x-access-token', tokenAdmin)
      .send(requestBody);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

    //user releases credential
    it('should release a credential', async () => {
      const response = await request(routing.app)
      .get(`/vcsrequest/release/${primoId}`)
      .set('x-access-token', token);
      console.log(primoId);
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
});