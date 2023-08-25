const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');
const { Pool } = require('./node_modules/pg');
const cors = require('./node_modules/cors');
const jwt = require("./node_modules/jsonwebtoken");
const jwtKey = "my_secret_key"
const jwtExpirySeconds = 3000

const app = express();
app.use(bodyParser.json());

// Configurazione del pool di connessione al database PostgreSQL
const pool = new Pool({
  user: 'admin',
  host: '10.5.0.31',
  database: 'originissuer',
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
    next();
  });
};



// Endpoint per ottenere tutte le richieste di credenziali
app.post('/credential/request/$id', verifyToken, async (req, res) => {
  try {
    const { dateofbirth, familyname, firstname, gender, nameandfamilynameatbirth, placeofbirth } = req.body;
    const email = req.userEmail;
    query='SELECT id FROM "users" WHERE email=$1';
    values=[email];
    result=await pool.query(query, values);
    userId=result.rows[0].id;



    // Query SQL per inserire la richiesta di credenziali con l'ID dell'utente
    query = `
      INSERT INTO credential_request (
        "user", "date_of_birth", "family_name", "first_name", "gender",
        "name_and_family_name_at_birth", "place_of_birth"
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7
      );
    `;

    // Esegui la query
    values = [userId, dateofbirth, familyname, firstname, gender, nameandfamilynameatbirth, placeofbirth];//valore di personalidfk hardcoded, da sistemare. dovrebbe essere userId, ma per qualche motivo è NULL
    result = await pool.query(query, values);

    // Invia la risposta con i dati delle richieste di credenziali
    res.status(200).json({ success: true, message: 'Credential Request Inserita'});
    res.end()
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l\'esecuzione della richiesta' });
    res.end()
  }
});

app.get('/credential/request', verifyToken, async (req, res) => {
  try {
    query='SELECT id FROM "users" WHERE email=$1';
    values=[req.userEmail];
    result=await pool.query(query, values);
    userId=result.rows[0].id;

    query='SELECT * FROM "credential_request" WHERE "user"=$1';
    values=[userId];
    result = await pool.query(query,values);
    res.status(200).json({ success: true, message: 'Credential Requests recuperate', result: result.rows});
    res.end()
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l\'esecuzione della richiesta '});
    res.end()
  }
});

app.get('/', async (req, res) => {
    try {
      res.json("{'hello':'hello world'}");
    } catch (error) {
      console.error('Errore durante l\'esecuzione della query:', error);
      res.status(500).json({ error: 'Errore durante l\'esecuzione della richiesta' });
    }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  //Controllo dei dati

  try {
  Authentication.login(email,password) -> Dabase
  }cathc(error){
    res.status(500).json({ success: false, message: 'Errore DATABSE' });
  }CATHC(ERROR){
    res.status(500).json({ success: false, message: 'Errore DI AUTENTICAZIONE' });
  }
 
});


// Endpoint per gestire la registrazione presso il sito dell'issuer
app.post('/register', async (req, res) => {
  try {
    const { familyName, firstName, email, password } = req.body;

    // Esegui la query di inserimento per memorizzare i dati della richiesta nel database
    const query = 'INSERT INTO users (family_name,first_name,email,password) VALUES ($1, $2, $3, $4)';
    const values = [familyName, firstName, email, password];
    
    result = await pool.query(query, values);
    if (result) {
        res.status(200).json({ success: true, message: 'Registrazione avvenuta con successo' });
    } else {
        res.status(403).json({ success: false, message: 'Errore durante la registrazione' });
    }
    res.end()
  } catch (error) {
    res.status(500).json({ success: false, message: 'Errore durante la richiesta' });
    res.end()
  }
});

// Avvio del server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
