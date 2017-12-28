var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');

});
socket.on('disconnect', function () {
    console.log('Disconnected to server');
});
socket.on('newMessage', (message) => {

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    })
    jQuery('#messages').append(html);

    var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // li.text(`${message.from}  ${formattedTime}: ${message.text}`);
    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {

    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime,
        lat: message.lon,
        lon: message.lat
    })
    jQuery('#messages').append(html);
    var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank"> My current location</a>');
    // li.text(`${message.from}  ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // var li2 = jQuery('<li></li>');
    // var iframe = jQuery(``);
    // li2.append(iframe);
    // // jQuery('#messages').append(li);
    // jQuery('#messages').append(li2);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not suppoerted by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    });
});