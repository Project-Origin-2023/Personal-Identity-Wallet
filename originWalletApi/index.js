//Include variabili di ambiente
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
//Avvio Routing
const {Routing} = require('./utils/Routing.js');
var routing = new Routing();
routing.configEndpoint();
routing.listen(process.env.E_PORT);