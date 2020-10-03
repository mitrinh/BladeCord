const BladeCordConstants = require("../utils/constants/BladeCordConstants");
const BladeCordErrorMessages = require("../utils/constants/messages/BladeCordErrorMessages");
const BladeCordMessages = require("../utils/constants/messages/BladeCordMessages");
const CommandUtil = require("../../commands/utils/CommandUtil");
const {prefix} = require("../../../config.json");
const Duel = require("../../duel.js");

const client = BladeCordConstants.client;

let duel;

/**
 * Start listening to commands via Discord messages
 */
function start() {
  CommandUtil.getAllCommands();
  client.on("message", message => {
    if (!CommandUtil.isBotCommand(message, prefix)) {
      return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (!CommandUtil.hasCommand(commandName)) {
      return message.reply(BladeCordMessages.COMMAND_NOT_FOUND);
    }

    const command = client.commands.get(commandName);
    if (!CommandUtil.satisfiesArgRequirement(command, args)) {
      return message.reply(`${BladeCordMessages.NOT_ENOUGH_ARGUMENTS} ${command.usage}`);
    }

    if (CommandUtil.isCommandGuildOnlyAndNotInGuild(command, message.channel.type)) {
      return message.reply(BladeCordMessages.GUILD_ONLY_COMMAND);
    }

    if (CommandUtil.isCommandDmOnlyAndNotInDms(command, message.channel.type)) {
      return message.reply(BladeCordMessages.DM_ONLY_COMMAND);
    }

    const reply = CommandUtil.sendReplyIfCommandOnCooldown(message, command);
    if (reply) {
      return reply;
    }

    CommandUtil.logCommand(message, commandName, args);
    try {
      command.execute(message, args);
    } catch (error) {
      console.error(`${BladeCordErrorMessages.GENERIC_ERROR} ${error}`)
      return message.reply(`${BladeCordErrorMessages.GENERIC_COMMAND_ERROR} ${error}`)
    }

    // switch (command) {
    //
    //   case "deck":
    //     DiscordBotController.sendMessage(message,"deck: " + duel.deck.print());
    //     break;
    //   case "hand":
    //     DiscordBotController.sendMessage(message, "hand 1: " + duel.player1.hand.print());
    //     DiscordBotController.sendMessage(message, "hand 2: " + duel.player2.hand.print());
    //     break;
    //   case "field":
    //     DiscordBotController.sendMessage(message, "field 1: " + duel.player1.field.print());
    //     DiscordBotController.sendMessage(message, "field 2: " + duel.player2.field.print());
    //     break;
    //   case "accept":
    //     if (duel.status === "not accepted" && author.id === duel.player2.id) {
    //       message.channel.send("Duel starting...");
    //       duel.status === "in progress";
    //     }
    //     break;
    //   case "duel":
    //     const mention = args[0];
    //     if (!mention) {
    //       DiscordBotController.reply(message, "usage: duel [@user]")
    //       break;
    //     }
    //
    //     const mentionedUser = BladeCordUtil.getUserFromMention(mention);
    //     if(!mentionedUser) {
    //       DiscordBotController.reply(message, `user: ${mention} is not found in channel: ${channel.name}`);
    //       break;
    //     }
    //
    //     if(mentionedUser.bot) {
    //       DiscordBotController.reply(message, "Dueling the bot is currently not supported.");
    //       break;
    //     }
    //
    //     const player2 = BladeCordUtil.getGuildMemberFromUser(guild, mentionedUser);
    //     DiscordBotController.sendMessage(message, `${player2.nickname} has been challenged! Type !accept to accept duel`);
    //     duel = new Duel();
    //     duel.player1.setId(author.id);
    //     duel.player2.setId(player2.id);
    //     break;
    //   default:
    // }
  });
}

module.exports = {
  start
}