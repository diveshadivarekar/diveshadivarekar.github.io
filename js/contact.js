// Build a properly encoded mailto link; native mailto form posts are unreliable.
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var value = function (id) { return document.getElementById(id).value.trim(); };
    var subject = 'Portfolio message from ' + value('name');
    var body = value('message') + '\n\n' + value('name') + '\n' + value('email');
    window.location.href = 'mailto:diveshadivarekar09@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});
