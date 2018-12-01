//Insert here all the post actions you want to support on your site
exports.contact = require('./contact')
exports.projects = require('./projects')

//Allow the action to be handled by the server
exports.allowedActions = ['contact', 'projects'];
