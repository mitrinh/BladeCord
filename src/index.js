// Michael Trinh
// BladeCord

const Discord = require('discord.js');
const Duel = require('./duel');
const token = '<token>';
const client = new Discord.Client();
const prefix = '!';

var err = 'error'; // error code
var duel;

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
    var author = message.guild.member(message.author);
    console.log(author.nickname, ': ', message.content.toString());
    /*
        check if in duel
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
            message.channel.send("hand 1: " + duel.player1.hand.print());
            message.channel.send("hand 2: " + duel.player2.hand.print());
            break;

        // tests if the field module works as intended 
        case 'field':
            message.channel.send("field 1: " + duel.player1.field.print());
            message.channel.send("field 2: " + duel.player2.field.print());
            break;     

        // used if player2 accepts duel
        case 'accept':
            //duel = new Duel; // do this for intellisense workaround
            if(duel.status == "not accepted" && author.id == duel.player2.id) {
                message.channel.send("Duel starting...");
                duel.status == "in progress";
            }
            break;

        //starts a duel
        case 'duel':
            // make duel object
            duel = new Duel();
            // gets the user first mentioned in the message as player 2
            const player2 = message.mentions.users.first();
            if(player2 === undefined) message.reply('usage: !duel <user>');
            else {
                const member = message.guild.member(player2);
                // checks if valid
                if (args[1] == member) {    
                    message.channel.send(player2 + ' has been challenged! ' +
                        'Type !accept to accept duel');
                    // connect the ids of both players to the player objects
                    duel.player1.setId(author.id);
                    duel.player2.setId(player2.id);
                }
                else message.reply('usage: !duel <user>');
            }
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