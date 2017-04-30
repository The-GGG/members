const Members = require('./index').Members;

const CONNECTION_STRING = '';

var members = new Members(CONNECTION_STRING);

test('get members', () => {
  members
  .getMembers()
  .then(members => {
    expect(members).toBeTruthy()})
});