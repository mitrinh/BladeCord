const BladeCordConstants = require("../utils/constants/BladeCordConstants");
const {token} = require("../../../config.json");
const client = BladeCordConstants.client;

/**
 * Log bot into Discord
 */
function login() {
  return client.login(token);
}

/**
 * turns off the bot
 */
function quit(message) {
  message.channel.send(":wave: :slight_smile:");
  client.destroy();
}

module.exports = {
  login,
  quit
};