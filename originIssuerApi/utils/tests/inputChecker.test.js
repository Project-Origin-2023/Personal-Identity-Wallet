//Include variabili di ambiente
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const { InputChecker } = require('../../utils/InputChecker');

describe('InputChecker', () => {
  const inputChecker = new InputChecker();

  it('should check if a value is a boolean', () => {
    expect(inputChecker.checkBoolean(true)).toBe(true);
    expect(inputChecker.checkBoolean(false)).toBe(true);
    expect(inputChecker.checkBoolean('true')).toBe(false);
    expect(inputChecker.checkBoolean(1)).toBe(false);
  });

  it('should check if a value is an integer', () => {
    expect(inputChecker.checkInteger(42)).toBe(true);
    expect(inputChecker.checkInteger(-42)).toBe(true);
    expect(inputChecker.checkInteger(42.5)).toBe(true);
    expect(inputChecker.checkInteger('42')).toBe(true);
  });

  it('should check if a value is a double', () => {
    expect(inputChecker.checkDouble(42.5)).toBe(true);
    expect(inputChecker.checkDouble(-42.5)).toBe(true);
    expect(inputChecker.checkDouble(42)).toBe(true);
    expect(inputChecker.checkDouble('42.5')).toBe(false);
  });

  it('should check if a value is a string', () => {
    expect(inputChecker.checkString('Hello')).toBe(true);
    expect(inputChecker.checkString(42)).toBe(false);
    expect(inputChecker.checkString(true)).toBe(false);
  });

  it('should check if a value is a valid name', () => {
    expect(inputChecker.checkName('John Doe')).toBe(true);
    expect(inputChecker.checkName('123')).toBe(false);
  });

  it('should check if a value is a valid email', () => {
    expect(inputChecker.checkEmail('test@example.com')).toBe(true);
    expect(inputChecker.checkEmail('invalid_email')).toBe(false);
  });

  it('should check if a value is a valid date', () => {
    expect(inputChecker.checkDate('2023 05 12')).not.toBe(null);
    expect(inputChecker.checkDate('2023-05-20')).not.toBe(null);
    expect(inputChecker.checkDate('2023/05/20')).not.toBe(null);
    expect(inputChecker.checkDate('29 12 2023')).toBe(null);
    expect(inputChecker.checkDate('12/05/2023')).toBe(null);

  });

  it('should check if a value is a valid marital status', () => {
    expect(inputChecker.checkMaritalStatus('married')).toBe(true);
    expect(inputChecker.checkMaritalStatus('divorced')).toBe(true);
    expect(inputChecker.checkMaritalStatus('single')).toBe(false);
  });

  it('should check if a value is a valid gender', () => {
    expect(inputChecker.checkGender('M')).toBe(true);
    expect(inputChecker.checkGender('F')).toBe(true);
    expect(inputChecker.checkGender('X')).toBe(false); // Genere non valido
  });

  it('should check if a value is a valid password', () => {
    expect(inputChecker.checkPassword('Abc1234@')).toBe(true);
    expect(inputChecker.checkPassword('ABC1234!')).toBe(false); // Mancanza di minuscole
    expect(inputChecker.checkPassword('password')).toBe(false); // Mancanza di maiuscole e caratteri speciali
    expect(inputChecker.checkPassword('Abc123')).toBe(false); // Mancanza di caratteri speciali
    expect(inputChecker.checkPassword('Abc123@')).toBe(false); // Lunghezza inferiore a 8 caratteri
  });

  it('should check if a value is a valid cohabitant status', () => {
    expect(inputChecker.checkMaritalStatus('cohabitant')).toBe(true);
    expect(inputChecker.checkMaritalStatus('partner')).toBe(false); // Stato non valido
  });

  // Aggiungi altri test se necessario
});
