const Discord = require('discord.js');
const token = 'NDk0MzY2ODYzNzkxMjI2ODgw.DoyfwA.MC4EzbrNRCyFEREVlwLTT8tACI8';
const client = new Discord.Client();
const prefix = '!';

var err = 'error';

/* 
notifies user when bot has turned on 
*/
client.on('ready', function () {
    console.log('Bot started.');
    client.user.setActivity('Ready');
}); // end start bot.on

/* 
prints error 
*/
function printError() {
    console.error('An error has occured: ', err, '.');    
} // end printError

/* 
allows user to enter commands for bot 
*/
client.on('message', function (message) { 
    // ignore commands bot sends
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(' ');
    author = message.guild.member(message.author);
    console.log(author.nickname, ': ', message.content.toString());
    switch(args[0].toLowerCase()) {
        // prints hello world 
        case 'test':
            message.channel.send('Hello World!');
            break;
        // starts a duel
        case 'duel':
            // gets the user first mentioned in the message
            const user = message.mentions.users.first();
            const member = message.guild.member(user);
            if (args[1] == member) {    
                message.channel.send(user + ' has been challenged!');

                /* code for duel here */

            }
            else message.reply('usage: !duel <user>');
            break;
        // turns bot off     
        case 'quit':
            client.destroy();
            break;
        // gives message on how to use commands    
        default:
            message.channel.send('usage: !<command> <param>*');
    }
}); // end command bot.on

client.login(token);