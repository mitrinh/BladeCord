const Discord = require(`discord.js`);
const BladeCordConstants = {
  client: new Discord.Client(),
  commands: new Discord.Collection(),
  cooldowns: new Discord.Collection(),
  defaultCooldown: 3
};

module.exports = BladeCordConstants;