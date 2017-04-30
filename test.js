const Members = require('./index').Members;

const CONNECTION_STRING = '';

var members = new Members(CONNECTION_STRING);

members
  .getMembers()
  .then(members => console.log(members));