// Michael Trinh
// BladeCord

const Discord = require('discord.js');
const Duel = require('./duel');
const token = '<token>';
const client = new Discord.Client();
const prefix = '!';

var err = 'error'; // error code

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

// make duel object
var duel = new Duel();

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
    /*
        check if in duel, add code here
    */
    //else do this when not in a duel
    switch(args[0].toLowerCase()) {
        // prints hello world 
        case 'test':
            message.channel.send('Hello World!');
            break;
        // tests if the deck module works as intended   
        case 'deck':
            message.channel.send("deck: " + duel.deck.print());
            break;   
        // tests if the hand module works as intended   
        case 'hand':
            message.channel.send("hand 1: " + duel.hand1.print());
            message.channel.send("hand 2: " + duel.hand2.print());
            break;
        // tests if the field module works as intended 
        case 'field':
            message.channel.send("field 1: " + duel.field1.print());
            message.channel.send("field 2: " + duel.field2.print());
            break;               
        // starts a duel
        case 'duel':
            
            // gets the user first mentioned in the message
            // const user = message.mentions.users.first();
            // const member = message.guild.member(user);
            // if (args[1] == member) {    
            //     message.channel.send(user + ' has been challenged!');

            //     /* code for duel here */

            // }
            // else message.reply('usage: !duel <user>');
            break;
        // turns bot off     
        case 'quit':
            message.channel.send(":wave: :slight_smile:");
            client.destroy();
            break;
        // gives message on how to use commands    
        default:
            message.channel.send('usage: !<command> <param>*');
    }
}); // end command bot.on

client.login(token);