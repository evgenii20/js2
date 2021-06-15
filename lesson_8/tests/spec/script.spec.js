//UnitTest
//импортируем тестируемый код
const script = require('../script');
//т.к. это объект, то мы получаем доступ к самой функции "pow"
const pow = script.pow;

describe('Функция pow()', () => {
  it('должна возвращать 9 при аргументах (3, 2)', () => {
    expect(pow(3, 2)).toBe(9);
  })
  it('должна возвращать null при аргументах (null, 2)', () => {
    expect(pow(null, 2)).toBeNull();
  })

});