const expect = require('expect');

const {
    isRealString
} = require('./validation');

describe('Is Real String', () => {
    it('Should reject non-string values', () => {
        var res = isRealString(99);
        expect(res).toBe(false);
    });

    it('Should reject string with only spaces', () => {
        var res = isRealString('      ');
        expect(res).toBe(false);
    });
    it('Should allow string with non-space characters', () => {
        var res = isRealString('   Erwin    ');
        expect(res).toBe(true);
    });

});