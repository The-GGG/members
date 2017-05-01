const Members = require('./index');

var members = new Members(process.env.MEMBERS_CONNECTION_STRING);

test('get members', () => {
  members
  .getMembers()
  .then(members => {
    expect(members).toBeTruthy()})
});