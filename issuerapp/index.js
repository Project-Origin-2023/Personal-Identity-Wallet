const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

// Configurazione del pool di connessione al database PostgreSQL
const pool = new Pool({
  user: 'admin',
  host: '10.5.0.5',
  database: 'issuerapp',
  password: 'admin',
  port: 5432,
});

// Configurazione delle opzioni di CORS
const corsOptions = {
  origin: 'http://localhost:19001',
};

// Abilita il middleware CORS con le opzioni configurate
app.use(cors(corsOptions));

// Endpoint per ottenere tutte le richieste di credenziali
app.get('/credential/request', async (req, res) => {
    try {
      // Query SQL per ottenere tutte le richieste di credenziali
      const query = `
        SELECT * FROM credential_request
      `;
  
      // Esegui la query
      const result = await pool.query(query);
  
      // Invia la risposta con i dati delle richieste di credenziali
      res.json(result.rows);
    } catch (error) {
      console.error('Errore durante l\'esecuzione della query:', error);
      res.status(500).json({ error: 'Errore durante l\'esecuzione della richiesta' });
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

// Endpoint per gestire la richiesta di credenziale
app.post('/credential/request', async (req, res) => {
  try {
    const { firstName, lastName, pin, password } = req.body;

    // Esegui la query di inserimento per memorizzare i dati della richiesta nel database
    const query = "INSERT INTO credential_request (first_name, last_name, pin, password) VALUES ($1, $2, $3, $4) RETURNING id ";

    const values = [firstName, lastName, pin, password];

    const result = await pool.query(query, values);
    console.log(result)

    // Invia una risposta di successo al client
    res.status(200).json({ success: true, requestId: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error processing credential request' });
  }
});

// Avvio del server
app.listen(19101, () => {
  console.log('Server is running on port 19101');
});
