const Discord = require('discord.js');
const token = 'NDk0MzY2ODYzNzkxMjI2ODgw.DoyfwA.MC4EzbrNRCyFEREVlwLTT8tACI8';
const client = new Discord.Client();
const prefix = '!';

var err = 'error';

/* notifies user when bot has turned on */
client.on('ready', function () {
    console.log('Bot started.');
    client.user.setActivity('Ready');
}); // end start bot.on

/* prints error */
function printError() {
    console.log('An error has occured: ', err, '.');    
} // end printError

/* allows user to enter commands for bot */
client.on('message', function (message) { 
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(' ');
    console.log(message.author.tag, ': ', message.content.toString());
    switch(args[0].toLowerCase()) {
        /* prints hello world */
        case 'test':
            message.channel.send('Hello World!');
            break;
        /* turns bot off */    
        case 'quit':
            client.destroy();
            break;
        /* gives message on how to use commands */    
        default:
            err = 'unknown command';
            message.channel.send('usage: !command');
    }
}); // end command bot.on

client.login(token);