var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');

});
socket.on('disconnect', function () {
    console.log('Disconnected to server');
});
socket.on('newMessage', (message) => {
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank"> My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    var li2 = jQuery('<li></li>');
    var iframe = jQuery(`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.420879748622!2d${message.lon}!3d${message.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQxJzM0LjYiTiA4OcKwMTMnMDUuNSJX!5e0!3m2!1ses-419!2ssv!4v1514437047300" width="400" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>`);
    li2.append(iframe);
    jQuery('#messages').append(li);
    jQuery('#messages').append(li2);
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