
class InputChecker {
  
  checkBoolean(value) {
    return typeof value === 'boolean';
  }

  checkInteger(value){
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
    // Definisci un'espressione regolare per il formato "dd mm aaaa"
    const datePattern = /^(\d{2})\s(\d{2})\s(\d{4})$/;

    // Verifica se il valore corrisponde al pattern
    const matches = value.match(datePattern);

    if (!matches) {
      return false; // Il formato non corrisponde
    }

    const day = parseInt(matches[1], 10);
    const month = parseInt(matches[2], 10);
    const year = parseInt(matches[3], 10);

    // Verifica se il giorno, il mese e l'anno sono validi
    if (
      day >= 1 && day <= 31 &&
      month >= 1 && month <= 12 &&
      year >= 1000 && year <= 9999
    ) {
      return true; // La stringa è una data valida.
    } else {
      return false; // La stringa NON è una data valida.
    }
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