const cors = require('./node_modules/cors');
const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');

const { DatabaseStrategy } = require('./utils/DatabaseStrategy')
const { DataScrapper } = require('./utils/DataScrapper')


const app = express();
app.use(bodyParser.json());

// Configurazione delle opzioni di CORS
const corsOptions = {
    origin: 'http://localhost:19001',
};
  
// Abilita il middleware CORS con le opzioni configurate
app.use(cors(corsOptions));

  
app.get('/', async (req, res) => {
    try {
        scrapper = new DataScrapper();
        scrapper.setStrategy(new DatabaseStrategy());
    }catch(e){
        res.status(500).json({status:"error", error:e, description:"Database connection error"});
    }
    var data = scrapper.login("nome","pass");
});

// Avvio del server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});