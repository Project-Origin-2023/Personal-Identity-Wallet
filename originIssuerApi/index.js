const cors = require('./node_modules/cors');
const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');


const { InputChecker } = require('./utils/InputChecker.js')
var inputChecker = new InputChecker();
console.log(inputChecker.checkInteger(2));
console.log(inputChecker.checkDouble(2.2));
console.log(inputChecker.checkString("ciao maria3"));
console.log(inputChecker.checkName("Maria Vittoria"));
console.log(inputChecker.checkEmail("andreibobirica@gmail.com"));
console.log(inputChecker.checkOnlyLetters("sdskh"));
console.log(inputChecker.checkGender("M"));
console.log(inputChecker.checkPassword("Blu8976lahleKL@d"));

const { DatabaseStrategy } = require('./utils/DataScrapper/DatabaseStrategy')
const { DataScrapper } = require('./utils/DataScrapper/DataScrapper.js')


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
    //console.log(await scrapper.getAccountByEmail("andreibobirica99@gmail.com"));
    //console.log(await scrapper.insertAccount("email", "hashed_pass", "salt"));
    //console.log(await scrapper.getAccountByEmail("email"));
    //console.log(await scrapper.getAccountById(2));
    //console.log(await scrapper.insertSys_admin(1,"role"));
    //console.log(await scrapper.insertSys_adminAccount("email22", "hashed_pass", "salt","role"));
    //console.log(await scrapper.getSys_adminById(1));
    //console.log(await scrapper.insertUser(3));
    //console.log(await scrapper.getUserById(3));
    //console.log(await scrapper.getVCSRequestsMarByUserId(2));
    //console.log(await scrapper.getVCSRequestsPidByUserId(2));
    //console.log(await scrapper.getVCSRequestVerification(2));
    //console.log(await scrapper.updateVCSRequestReleased(2,false));
    res.status(200).json("hello");
});

// Avvio del server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});