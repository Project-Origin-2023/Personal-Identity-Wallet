//Avvio Routing
const {Routing} = require('./utils/Routing.js');
var routing = new Routing();
routing.configEndpoint();
routing.listen(3000);