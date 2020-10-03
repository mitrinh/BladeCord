const BladeCordConstants = require("../utils/constants/BladeCordConstants");
const client = BladeCordConstants.client;

/**
 * Turns the bot online
 */
function start() {
  client.once("ready", () => {
    console.log("Bot started.");
    return client.user.setActivity("Ready");
  });
}

module.exports = {
  start
}