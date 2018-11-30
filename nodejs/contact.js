function formPostDataToObj(formData) {
    var formObj = {
    };
    if (formData == null) {
        return formObj;
    }
    var formDataString = formData.toString('utf8');

    formDataString = formDataString.replace("%40","@");
    formDataString = formDataString.replace("+"," ");

    var fields = formDataString.split("&");

    for (var i = 0; i < fields.length; i++) {
        var values = fields[i].split('=');
        if (values && values.length === 2) {
            formObj[values[0]] = values[1];
        }
    }

    return formObj;
}

function sendFormMail(server, formData) {
    if (!formData['firstname']) {
        console.log('Warning: firstname is not filled in');
        return;
    }
    if (!formData['lastname']) {
        console.log('Warning: lastname is not filled in');
        return;
    }
    if (!formData['email']) {
        console.log('Warning: email is not filled in');
        return;
    }
    if (!formData['subject']) {
        console.log('Warning: subject is not filled in');
        return;
    }

    text =
    'Form filled in:\n' +
    '\n' +
    'Firstname: ' + formData['firstname'] +
    '\n' +
    'Lastname: ' + formData['lastname'] +
    '\n' +
    'E-Mail address: ' + formData['email'] +
    '\n' +
    'Text:' +
    '\n' +
    formData['subject'];

    server.mail.sendMail(server.mail.getUserEMailAddress(), 'Form data', text);
}

module.exports = {
    handlePost : function(server, data) {
        var formData = formPostDataToObj(data);
        sendFormMail(server, formData);
        //This is the page where the site should return to after filling in the form
        return '/html/contact.html';
    }
};
