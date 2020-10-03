const CommandDescriptionConstants = require("./utils/constants/CommandDescriptionConstants.js");
const CommandMessageConstants = require("./utils/constants/CommandMessageConstants.js");
const CommandNameConstants = require("./utils/constants/CommandNameConstants.js");
const CommandUsageConstants = require("./utils/constants/CommandUsageConstants");

module.exports = {
  name: CommandNameConstants.HELLO_COMMAND_NAME,
  description: CommandDescriptionConstants.HELLO_COMMAND_DESCRIPTION,
  cooldown: 5,
  guildOnly: true,
  dmOnly: false,
  args: false,
  minArgsRequired: 0,
  usage: CommandUsageConstants.HELLO_COMMAND_USAGE,
  execute(message, args) {
    return message.channel.send(CommandMessageConstants.HELLO_WORLD_RESPONSE);
  }
}