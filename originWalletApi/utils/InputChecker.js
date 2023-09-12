
class InputChecker {
  
  checkBoolean(value) {
    return typeof value === 'boolean';
  }

  checkInteger(value){
    value = parseInt(value)
    return Number.isInteger(value);
  }

  checkDouble(value) {
    return typeof value === 'number' && !isNaN(value);
  }

  checkString(value) {
    return typeof value === 'string';
  }

  checkName(value) {
    return this.checkString(value) && this.checkOnlyLetters(value);
  }

  checkEmail(value) {
    return this.checkString(value) && /[^@]+@[^@]+\.[^@]+/.test(value);
  }

  checkOnlyLetters(value) {
   // Verifica se la stringa contiene solo lettere (maiuscole o minuscole) e spazi vuoti
   return /^[A-Za-z\s]+$/.test(value);
  }

  checkDate(value) {
    // Definisci un'espressione regolare per il formato "gg mm aaaa" con trattino, slash o spazio come separatori
    const datePattern = /^(\d{4})[-/ ](\d{2})[-/ ](\d{2})$/;
  
    // Verifica se il valore corrisponde al pattern
    const matches = value.match(datePattern);
  
    return matches;
  
  }
  
  
  checkMaritalStatus(value) {
    return value === 'canceled' || value === 'married' || value === 'divorced' || value === 'widower' || value === 'separate' || value === 'other' || value === 'cohabitant';
  }
  checkGender(value) {
    return value === 'M' || value === 'F';
  }
  // La struttura della password prevede almeno 8 caratteri, con almeno una maiuscola, una minuscola, un numero e un carattere speciale
  checkPassword(value) {
    return this.checkString(value) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
  }
}

//Export for public uses
module.exports = {
  InputChecker:InputChecker
}