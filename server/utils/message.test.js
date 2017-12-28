var expect = require('expect');

var {
    generateMessage,
    generateLocationMessage
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

describe('Generate Location Message', () => {
    it('Should generate a correct location object', () => {
        var from = 'Dev';
        var latitude = 15;
        var longitud = 19;
        var url = 'https://www.google.com/maps?q=15,19';
        var message = generateLocationMessage(from, latitude, longitud);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            url
        });

    });
});