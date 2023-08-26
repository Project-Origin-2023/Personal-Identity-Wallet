import sanitize from 'node-sanitize';

class InputChecker {
  constructor(data) {
    this.data = data;
  }

  static async checkInteger(value) {
    return Number.isInteger(value);
  }

  static async checkDouble(value) {
    return typeof value === 'number' && !isNaN(value);
  }

  static async checkString(value) {
    return typeof value === 'string';
  }

  checkName() {
    const sanitized = sanitize(this.data).trim().escape();
    return sanitized.length >= 3;
  }

  checkEmail() {
    const sanitized = sanitize(this.data).normalizeEmail();
    return /[^@]+@[^@]+\.[^@]+/.test(sanitized);
  }

  checkOnlyLetters() {
    return /^[A-Za-z]+$/.test(this.data);
  }

  checkGender() {
    return this.data === 'M' || this.data === 'F';
  }
  // La struttura della password prevede almeno 8 caratteri, con almeno una maiuscola, una minuscola, un numero e un carattere speciale
  checkPassword() {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.data);
  }

  // Input sanitize per evitare sql injection
  static async sanitizeData(data) {
    return sanitize(data).escape();
  }
}