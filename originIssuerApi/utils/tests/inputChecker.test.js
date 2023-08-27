const { InputChecker } = require('../../utils/InputChecker');

describe('InputChecker', () => {
  const inputChecker = new InputChecker();

  test('checkInteger should return true for integers', () => {
    expect(inputChecker.checkInteger(5)).toBe(true);
    expect(inputChecker.checkInteger(3.14)).toBe(false); // Test for double input
    expect(inputChecker.checkInteger('5')).toBe(false); // Test for non-integer input
  });

  test('checkDouble should return true for valid doubles', () => {
    expect(inputChecker.checkDouble(5.5)).toBe(true);
    expect(inputChecker.checkDouble('5.5')).toBe(false); // Test for non-double input
  });

  test('checkString should return true for valid strings', () => {
    expect(inputChecker.checkString('Hello')).toBe(true);
    expect(inputChecker.checkString(42)).toBe(false); // Test for non-string input
    expect(inputChecker.checkString('')).toBe(true); // Test for empty string
  });
  
  test('checkName should return true for valid names', () => {
    expect(inputChecker.checkName('John Doe')).toBe(true);
    expect(inputChecker.checkName('A')).toBe(false); // Test for short name
    expect(inputChecker.checkName('Ian')).toBe(true); // Test for 3 letters name
    expect(inputChecker.checkName(123)).toBe(false); // Test for non-string input
  });
  
  test('checkEmail should return true for valid email addresses', () => {
    expect(inputChecker.checkEmail('test@example.com')).toBe(true);
    expect(inputChecker.checkEmail('invalid-email')).toBe(false); // Test for invalid email format
    expect(inputChecker.checkEmail('invalid@email')).toBe(false); // Test for invalid email format
    expect(inputChecker.checkEmail(123)).toBe(false); // Test for non-string input
  });
  
  test('checkOnlyLetters should return true for strings containing only letters', () => {
    expect(inputChecker.checkOnlyLetters('abcdef')).toBe(true);
    expect(inputChecker.checkOnlyLetters('abc123')).toBe(false); // Test for digits
    expect(inputChecker.checkOnlyLetters('ABC DEF')).toBe(true); // Test for spaces
  });
  
  test('checkGender should return true for valid gender values', () => {
    expect(inputChecker.checkGender('M')).toBe(true);
    expect(inputChecker.checkGender('F')).toBe(true);
    expect(inputChecker.checkGender('Other')).toBe(false); // Test for invalid gender
  });
  
  test('checkPassword should return true for valid passwords', () => {
    expect(inputChecker.checkPassword('Password123!')).toBe(true);
    expect(inputChecker.checkPassword('weakpass')).toBe(false); // Test for weak password
    expect(inputChecker.checkPassword(123)).toBe(false); // Test for non-string input
    expect(inputChecker.checkPassword('Prova123')).toBe(false); // Test for missing special character
    expect(inputChecker.checkPassword('Provaaa!')).toBe(false); // Test for missing number
    expect(inputChecker.checkPassword('provaaa1!')).toBe(false); // Test for missing uppercase letter
  });
  

});
