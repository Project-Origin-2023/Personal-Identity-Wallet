const request = require('supertest');
const { Routing } = require('../../utils/Routing.js');

describe('POST /auth/register', () => {
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
it('should return 500 with "Password Missing" message if password is missing', async () => {
    const response = await request(routing.app)  // Utilizza l'istanza di Routing
      .post('/auth/login')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false, message: 'Password Login Missing' });
  });

});

describe('GET /vcsrequest/marital', () => {
    const routing = new Routing();
    routing.configEndpoint();
  
    it('should return 200 with data for non-SysAdmin user', async () => {
        const response = await request(routing.app) 
        .get('vcsrequest/merital');
        //sicuramente va mandato qualcosa 
        expect(response.status).toBe(500),
        expect(response.body).toEqual({success: false, description: 'Sys_Admin Authorization, lgo in with an User Account' });
    });
  
    // ... Altri test simili ...
  });
  