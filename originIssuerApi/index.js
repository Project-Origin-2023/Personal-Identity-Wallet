const cors = require('./node_modules/cors');
const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');

const { DatabaseStrategy } = require('./utils/DatabaseStrategy')
const { DataScrapper } = require('./utils/DataScrapper')


//Autenticazione crypto
var crypto = require('crypto');
var salt = crypto.randomBytes(16).toString('hex'); 
console.log(salt);
var hash = crypto.pbkdf2Sync("adminadmin", salt,500, 64, `sha512`).toString(`hex`);
console.log(hash);
//check
var hash2 = crypto.pbkdf2Sync("adminadminNO", salt,500, 64, `sha512`).toString(`hex`);
console.log((hash2 === hash) ? "hashtrue" : "hashfalse");

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
    var data = await scrapper.getAccountByEmail("andreibobirica99@gmail.com");
    res.status(200).json(data);
});

// Avvio del server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});