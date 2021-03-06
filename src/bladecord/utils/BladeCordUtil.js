const BladeCordConstants = require("./constants/BladeCordConstants");
const client = BladeCordConstants.client;

/**
 * returns user from mention
 */
function getUserFromMention(mention) {
  // The id is the first and only match found by the RegEx.
  const matches = mention.match(/^<@!?(\d+)>$/);
  // If supplied variable was not a mention, matches will be null instead of an array.
  if (!matches) return;
  // However the first element in the matches array will be the entire mention, not just the ID,
  // so use index 1.
  const id = matches[1];
  return client.users.cache.get(id);
}

function getGuildMemberFromUser(guild, user) {
  return guild.member(user);
}

function createMentionFromUserId(id) {
  return `<@${id}>`;
}

module.exports = {
  getUserFromMention,
  getGuildMemberFromUser,
  createMentionFromUserId
};