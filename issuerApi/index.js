const express = require('../issuerApp/node_modules/express');
const bodyParser = require('../issuerApp/node_modules/body-parser');
const { Pool } = require('../issuerApp/node_modules/pg');
const cors = require('../issuerApp/node_modules/cors');
const jwt = require("../issuerApp/node_modules/jsonwebtoken");
const jwtKey = "my_secret_key"
const jwtExpirySeconds = 3000

const app = express();
app.use(bodyParser.json());



// Configurazione del pool di connessione al database PostgreSQL
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'issuerApp',
  password: 'admin',
  port: 5432,
});

// Configurazione delle opzioni di CORS
const corsOptions = {
  origin: 'http://localhost:19001',
};

// Abilita il middleware CORS con le opzioni configurate
app.use(cors(corsOptions));

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userEmail = decoded.email;
    //console.log(req.userEmail);
    next();
  });
};

// Endpoint per ottenere tutte le richieste di credenziali
app.post('/credential/request', verifyToken, async (req, res) => {
  try {
    const { dateofbirth, familyname, firstname, gender, nameandfamilynameatbirth, placeofbirth } = req.body;
    const email = req.userEmail;
    query='SELECT id FROM "registered_users" WHERE email=$1';
    values=[email];
    result=await pool.query(query, values);
    userId=result.rows[0].id;
    //console.log(userId);

    // Query SQL per inserire la richiesta di credenziali con l'ID dell'utente
    query = `
      INSERT INTO public.credential_request (
        "user_id", "date_of_birth", "family_name", "first_name", "gender",
        "name_and_family_name_at_birth", "place_of_birth", "status"
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, true
      );
    `;

    // Esegui la query
    values = [userId, dateofbirth, familyname, firstname, gender, nameandfamilynameatbirth, placeofbirth];//valore di personalidfk hardcoded, da sistemare. dovrebbe essere userId, ma per qualche motivo è NULL
    result = await pool.query(query, values);

    // Invia la risposta con i dati delle richieste di credenziali
    res.json(result.rows);
  } catch (error) {
    console.error('Errore durante l\'esecuzione della query:', error);
    res.status(500).json({ error: 'Errore durante l\'esecuzione della richiesta' });
  }
});

app.post('/credential/view_request', async(req, res) => {
try {
  const query=`SELECT * FROM "credential_request"`;
  const result = await pool.query(query);
  res.json(result.rows);
} catch (error) {
  console.error('Errore durante l\'esecuzione della query:', error);
  res.status(500).json({ error: 'Errore durante l\'esecuzione della richiesta di view'});
  }
});



app.get('/', async (req, res) => {
    try {
      res.json("{'hello':'hello'}");
    } catch (error) {
      console.error('Errore durante l\'esecuzione della query:', error);
      res.status(500).json({ error: 'Errore durante l\'esecuzione della richiesta' });
    }
});

  
  app.post('/Login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Esegui la query per accedere
      const query = 'SELECT * FROM "registered_users" WHERE email = $1 AND password = $2';
      const values = [email, password];
      const result = await pool.query(query, values);
  
      // Restituisci le richieste trovate se l'utente è stato trovato ed è unico
      if(result.rows.length==1)
      { 
        // Create a new token with the email in the payload
        // and which expires 3000 seconds after issue
        const token = jwt.sign({ email }, jwtKey, {
          algorithm: "HS256",
          expiresIn: jwtExpirySeconds,
        })
        res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
        res.json({ success: true, message: 'Login Effettuato', email: email, token: token });
        res.end()
      } 
      else
      res.status(403).json({ success: false, message: 'Credenziali non valide' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error retrieving requests' });
    }
  });


  // Endpoint per gestire la registrazione presso il sito dell'issuer
  app.post('/Register', async (req, res) => {
    try {
      const { familyName, firstName, email, password } = req.body;
  
      // Esegui la query di inserimento per memorizzare i dati della richiesta nel database
      const query = 'INSERT INTO "registered_users" ("family_name", "first_name", "email", "password") VALUES ($1, $2, $3, $4)';
  
      const values = [familyName, firstName, email, password];
  
      result = await pool.query(query, values);
      if (result) {
          res.status(200).json({ success: true, message: 'Registrazione avvenuta con successo' });
      } else {
          res.status(403).json({ success: false, message: 'Errore durante la registrazione' });
      }
    } catch (error) {
      // Gestione dell'errore della query di inserimento
      res.status(403).json({ success: false, message: 'Errore durante la registrazione' });
    }
  });

// Avvio del server
app.listen(19101, () => {
  console.log('Server is running on port 19101');
});
