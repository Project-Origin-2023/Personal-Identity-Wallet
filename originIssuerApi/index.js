const cors = require('./node_modules/cors');
const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');

const { DatabaseIssuer } = require('./utils/DatabaseIssuer')


const app = express();
app.use(bodyParser.json());

// Configurazione delle opzioni di CORS
const corsOptions = {
    origin: 'http://localhost:19001',
};
  
// Abilita il middleware CORS con le opzioni configurate
app.use(cors(corsOptions));

  
app.get('/', async (req, res) => {
    db = new DatabaseIssuer({
        user: 'admin',
        host: '10.5.0.5',
        database: 'issuerapp',
        password: 'admin',
        port: 5432,
    });

    try {
      res.json("{'hello':'hello world'}");
    } catch (error) {
      console.error('Errore durante l\'esecuzione della query:', error);
      res.status(500).json({ error: 'Errore durante l\'esecuzione della richiesta' });
    }
});

// Avvio del server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});