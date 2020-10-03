const BladeCordConstants = require("../../bladecord/utils/constants/BladeCordConstants");
const BladeCordMessages = require("../../bladecord/utils/constants/messages/BladeCordMessages");
const BladeCordUtils = require("../../bladecord/utils/BladeCordUtil");
const Discord = require(`discord.js`);
const fs = require("fs");

const client = BladeCordConstants.client;
const cooldowns = BladeCordConstants.cooldowns;

/**
 * log command in console
 */
function logCommand(message, commandName, args) {
  const guild = message.guild;
  const author = message.author;
  const channel = message.channel;

  const authorName = guild ? BladeCordUtils.getGuildMemberFromUser(guild, message.author) : author.username;
  const guildName = guild ? guild.name : undefined;
  const channelName = channel.name ? channel.name : channel.type;

  console.log(`Author: ${authorName}, Server: ${guildName}, Channel: ${channelName}, Command: ${commandName}, Arguments: ${args}`);
}

/**
 * gets all bot commands in the "commands" directory
 */
function getAllCommands() {
  client.commands = BladeCordConstants.commands;
  const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`../../commands/${file}`);
    client.commands.set(command.name, command);
  }
}

/**
 * Ignore messages bot sends and messages that dont have configured prefix
 * @param message
 * @param prefix
 * @returns {boolean}
 */
function isBotCommand(message, prefix) {
  return !message.author.bot && message.content.startsWith(prefix);
}

/**
 * Checks if command is in command list
 * @param commandName
 * @returns {boolean}
 */
function hasCommand(commandName) {
  return client.commands.has(commandName);
}

/**
 * checks if the number of arguments provided is enough to execute command
 * @param command
 * @param args
 * @returns {boolean}
 */
function satisfiesArgRequirement(command, args) {
  return command.minArgsRequired <= args.length;
}

/**
 * checks if the command is server only and was not sent in server.
 * @param command
 * @param messageChannelType
 * @returns {boolean}
 */
function isCommandGuildOnlyAndNotInGuild(command, messageChannelType) {
  return command.guildOnly && messageChannelType !== "text";
}

/**
 * checks if the command is dm only and was not sent in dms.
 * @param command
 * @param messageChannelType
 * @returns {boolean}
 */
function isCommandDmOnlyAndNotInDms(command, messageChannelType) {
  return command.dmOnly && messageChannelType !== "dm";
}

/**
 * If command sent is on cooldown, return message reply to user with cooldown, else return null
 * @param message
 * @param command
 * @returns {*}
 */
function getReplyIfCommandOnCooldown(message, command) {
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || BladeCordConstants.defaultCooldown) * 1000;
  const authorId = message.author.id;

  if (timestamps.has(authorId)) {
    const expirationTime = timestamps.get(authorId) + cooldownAmount;
    if (now < expirationTime) {
      timestamps.set(authorId, now);
      setTimeout(() => timestamps.delete(authorId), cooldownAmount);
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`${command.name} ${BladeCordMessages.COMMAND_ON_COOLDOWN} ${timeLeft.toFixed(1)}`);
    }
  }
  timestamps.set(authorId, now);
  setTimeout(() => timestamps.delete(authorId), cooldownAmount);
  return undefined;
}

module.exports = {
  logCommand,
  getAllCommands,
  isBotCommand,
  hasCommand,
  satisfiesArgRequirement,
  isCommandGuildOnlyAndNotInGuild,
  isCommandDmOnlyAndNotInDms,
  sendReplyIfCommandOnCooldown: getReplyIfCommandOnCooldown
};