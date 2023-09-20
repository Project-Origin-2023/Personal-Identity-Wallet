//Include variabili di ambiente
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const request = require('supertest');
const { Routing } = require('../../utils/Routing.js');
const routing = new Routing();
routing.configEndpoint();




//test mancanza email su registrazione
it('should return 500 with "Email Missing" message if email is missing', async () => {
  const response = await request(routing.app) 
    .post('/auth/register')
    .send({ password: 'password123' });

  expect(response.status).toBe(500);
  expect(response.body).toEqual({ success: false, description: "email Missing" });
});
//test mancanza password su registrazione
it('should return 500 with "Password Missing" message if password is missing', async () => {
  const response = await request(routing.app) 
    .post('/auth/register')
    .send({ email: 'test@example.com' });

  expect(response.status).toBe(500);
  expect(response.body).toEqual({ success: false, description: 'password Missing' });
});
//test formato email su registrazione
it('should return 500 with "Email Format" message if email is not valid', async () => {
  const response = await request(routing.app)
    .post('/auth/register')
    .send({ email: 'testexample.com', password: 'password123' });
    
  expect(response.status).toBe(500);
  expect(response.body).toEqual({ success: false, description: 'email format not valid' });
});
//test formato password su registrazione
it('should return 500 with "Password Format" message if password is not valid', async () => {
  const response = await request(routing.app) 
    .post('/auth/register')
    .send({ email: 'test@example.com', password: 'password' });

  expect(response.status).toBe(500);
  expect(response.body).toEqual({ success: false, description: 'password format not valid' });
});


//test registrazione che va a buon fine
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

//test registrazione con email già presente
it('should return 500 with "Email Already Exists" message if email is already present', async () => {
  const crypto = require('crypto');
  const email = crypto.randomUUID()+"@gmail.com";
  const password = "1234abc!A";
  const response = await request(routing.app)  
    .post('/auth/register')
    .send({ email: email, password: password });
  expect(response.status).toBe(200);
  const response2 = await request(routing.app)  
    .post('/auth/register')
    .send({ email: email, password: password });
  expect(response2.status).toBe(500);
  expect(response2.body.success).toEqual(false );
});

//test di login con email non presente
it('should return 500 with "Email Not Found" message if email is not present', async () => {
  const crypto = require('crypto');
  const email = crypto.randomUUID()+"@gmail.com";
  const password = "1234abc!A";
  const response = await request(routing.app)  
    .post('/auth/login')
    .send({ email: email, password: password });
  expect(response.status).toBe(500);
  expect(response.body).toEqual({ success: false, description: 'Account Does Not exist' });
});

//test di login con password non corretta
it('should return 500 with "Password Not Correct" message if password is not correct', async () => {
  const crypto = require('crypto');
  const email = crypto.randomUUID()+"@gmail.com";
  const password = "1234abc!A";
  const response = await request(routing.app) 
    .post('/auth/register')
    .send({ email: email, password: password });
  expect(response.status).toBe(200);
  const response2 = await request(routing.app) 
    .post('/auth/login')
    .send({ email: email, password: password+"not" });
  expect(response2.status).toBe(500);
  expect(response2.body).toEqual({ success: false, description: 'Password is not correct' });
});

//test di login con email e password corretti
it('should return 200 with "Login Successful" message if login is successful', async () => {
  const crypto = require('crypto');
  const email = crypto.randomUUID()+"@gmail.com";
  const password = "1234abc!A";
  const response = await request(routing.app) 
    .post('/auth/register')
    .send({ email: email, password: password });
  expect(response.status).toBe(200);
  const response2 = await request(routing.app) 
    .post('/auth/login')
    .send({ email: email, password: password });
  expect(response2.status).toBe(200);
});

//login con account valido
it('should return 200 with "Login Successful" message if login is successful', async () => {
  const email = "mario.rossi@gmail.com";
  const password = "Mariorossi123!";
  const response = await request(routing.app) 
    .post('/auth/login')
    .send({ email: email, password: password });
  expect(response.status).toBe(200);
});

//richiedere la lista delle credenziali vuota (non ci sono credenziali)
it('should return 200 with "Empty List" message if there are no credentials', async () => {
  const email = "mario.rossi@gmail.com";
  const password = "Mariorossi123!";
  const response = await request(routing.app)
    .post('/auth/login')
    .send({ email: email, password: password });
  expect(response.status).toBe(200);
  const response2 = await request(routing.app)
    .get('/credentials')
    .set('x-access-token', response.body.data.token);
  expect(response2.status).toBe(200);
  expect(response2.body).toEqual({"data": {"list": []}, "description": "Open ID Request end with success", "success": true});
});

//test dove non passo il token
it('should return 500 with "Token Missing" message if token is missing', async () => {
  const response = await request(routing.app)
    .get('/credentials');
  expect(response.status).toBe(403);
  expect(response.body).toEqual({ success: false, description: 'Auth Token Not found, be sure to be logged in' });
}
);


  

































