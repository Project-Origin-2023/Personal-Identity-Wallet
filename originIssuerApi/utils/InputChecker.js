
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
    return this.checkString(value) && value.length >= 3;
  }

  checkEmail(value) {
    return this.checkString(value) && /[^@]+@[^@]+\.[^@]+/.test(value);
  }

  checkOnlyLetters(value) {
    // Rimuovi tutti i caratteri tranne le lettere e gli spazi vuoti
    const stringWithoutSpecialChars = value.replace(/[^A-Za-z\s]/g, '');
  
    // Verifica se la stringa contiene solo lettere e spazi vuoti
    return /^[A-Za-z\s]+$/.test(stringWithoutSpecialChars);
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