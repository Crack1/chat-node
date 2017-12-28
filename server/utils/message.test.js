var expect = require('expect');

var {
    generateMessage
} = require('./message');


describe('GenerateMessage', () => {
    it('Should generate correct message object', () => {
        var from = 'Jen';
        var text = 'some text';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });
    });
});