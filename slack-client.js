const rp = require('request-promise');

module.exports = class SlackClient {
  constructor(webhookUrl) {
    this.webhookUrl = webhookUrl;
  }

  sendMessage(message) {
    return rp({
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        uri: this.webhookUrl,
        body: JSON.stringify({text: message}),
    })
      .then(res => console.log(message))
      .catch(function(error) {
        console.error('error!!!!');
        console.error(error);
      });
  }
}