//Include variabili di ambiente
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const request = require('supertest');
const { Routing } = require('../../utils/Routing.js');
const crypto = require('crypto');
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

let email;
let password;
//test registrazione che va a buon fine
it('should return 200 with "Registration Successful" message if registration is successful', async () => {
   // Utilizza l'istanza di Routing
  console.log(crypto.randomUUID()+"@gmail.com")
  email = crypto.randomUUID()+"@gmail.com";
  password = "1234abc!A";
  const response = await request(routing.app) 
    .post('/auth/register')
    .send({ email: email, password: password });
  expect(response.status).toBe(200); 
});

//test di login con email e password corretti
it('should return 200 with "Login Successful" message if login is successful', async () => {
  const response = await request(routing.app) 
    .post('/auth/login')
    .send({ email: email, password: password });
  expect(response.status).toBe(200);
});

//test registrazione con email già presente
it('should return 500 with "Email Already Exists" message if email is already present', async () => {
  const response = await request(routing.app)  
    .post('/auth/register')
    .send({ email: email, password: password });
  expect(response.status).toBe(500);
  expect(response.body.success).toEqual(false);
});

//test di login con email non presente
it('should return 500 with "Email Not Found" message if email is not present', async () => {
  const response = await request(routing.app)  
    .post('/auth/login')
    .send({ email: email+'1', password: password });
  expect(response.status).toBe(500);
  expect(response.body).toEqual({ success: false, description: 'Account Does Not exist' });
});

//test di login con password non corretta
it('should return 500 with "Password Not Correct" message if password is not correct', async () => {
  const response = await request(routing.app) 
    .post('/auth/login')
    .send({ email: email, password: password+"not" });
  expect(response.status).toBe(500);
  expect(response.body).toEqual({ success: false, description: 'Password is not correct' });
});

//login con account valido gia' presente nel DB
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

//fa partire una CI
it('should return 200 with "ci start success" message if the openid components works', async () => {
  const response = await request(routing.app)
    .post('/auth/login')
    .send({ email: email, password: password });
  expect(response.status).toBe(200);
  const response2 = await request(routing.app)
    .post('/ci/continuexdevice')
    .set('x-access-token', response.body.data.token)
    .send({uri:"openid-initiate-issuance://?issuer=http%3A%2F%2Fopenid.issuer.origin%2Fissuer-api%2Fdefault%2Foidc%2F&credential_type=PID&pre-authorized_code=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjMDAwNGQ4Mi04YjNjLTQ1ZGUtYjFjYi02ZWVmNjE0MzMyYjEiLCJwcmUtYXV0aG9yaXplZCI6dHJ1ZX0.fz1ayO8o0NGruREXwmtKO54K_Z56nZh7MnOSENN8hBA&user_pin_required=false"});
  expect(response2.status).toBe(200);
  console.log(response2)
  expect(response2.body.description).toEqual("Open ID Request end with success");
  expect(response2.body.success).toEqual(true);
});

//Errore CI
it('should return 500 with "ci start success" message if the openid components', async () => {
  const response = await request(routing.app)
    .post('/auth/login')
    .send({ email: email, password: password });
  expect(response.status).toBe(200);
  const response2 = await request(routing.app)
    .post('/ci/continuexdevice')
    .set('x-access-token', response.body.data.token)
    .send({uri:"opensid-initiate-issuance://?"});
  expect(response2.status).toBe(500);
});

//fa partire una VP
it('should return 200 with "vp start success" message if the openid components works', async () => {
  const response = await request(routing.app)
    .post('/auth/login')
    .send({ email: email, password: password });
  expect(response.status).toBe(200);
  const response2 = await request(routing.app)
    .post('/vp/start')
    .set('x-access-token', response.body.data.token)
    .send({uri:"openid://?scope=openid&presentation_definition=%7B%22format%22+%3A+null%2C+%22id%22+%3A+%221%22%2C+%22input_descriptors%22+%3A+%5B%7B%22constraints%22+%3A+%7B%22fields%22+%3A+%5B%7B%22filter%22+%3A+%7B%22const%22%3A+%22PID%22%7D%2C+%22id%22+%3A+null%2C+%22path%22+%3A+%5B%22%24.type%22%5D%2C+%22purpose%22+%3A+null%7D%5D%7D%2C+%22format%22+%3A+null%2C+%22group%22+%3A+null%2C+%22id%22+%3A+%221%22%2C+%22name%22+%3A+null%2C+%22purpose%22+%3A+null%2C+%22schema%22+%3A+null%7D%5D%2C+%22name%22+%3A+null%2C+%22purpose%22+%3A+null%2C+%22submission_requirements%22+%3A+null%7D&response_type=vp_token&redirect_uri=http%3A%2F%2Fopenid.verifier.origin%2Fverifier-api%2Fdefault%2Fverify&state=3FR81DO6T9Sv-8j0DiUA4g&nonce=3FR81DO6T9Sv-8j0DiUA4g&client_id=http%3A%2F%2Fopenid.verifier.origin%2Fverifier-api%2Fdefault%2Fverify&response_mode=post"});
  expect(response2.status).toBe(200);
  console.log(response2)
  expect(response2.body.description).toEqual("Open ID Request end with success");
  expect(response2.body.success).toEqual(true);
});

//Errore vP
it('should return 500 with "vp start error" message if the openid components works', async () => {
  const response = await request(routing.app)
    .post('/auth/login')
    .send({ email: email, password: password });
  expect(response.status).toBe(200);
  const response2 = await request(routing.app)
    .post('/vp/start')
    .set('x-access-token', response.body.data.token)
    .send({uri:"opens://?"});
  expect(response2.status).toBe(500);
});

  

































