// Michael Trinh
// BladeCord

const Discord = require('discord.js');
const Card = require('./card.js');
const Deck = require('./deck.js');
const token = <token>
const client = new Discord.Client();
const prefix = '!';

const cardTypes = 11; // 1-7, bolt, mirror, blast, force
const numOfCopies = 4 // number of copies of each card in deck
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
        // tests if the card module works as intended    
        case 'card':
            var card = new Card(false,0,4);
            message.channel.send(card.value);
            message.channel.send(card.isRegularCard());
            break;  
        // tests if the deck module works as intended   
        case 'deck':
            var deck = new Deck(cardTypes, numOfCopies);
            deck.create();
            // print deck
            var printDeck = deck.contents[0].value + ', ';
            console.log(deck.contents.length);
            for(i = 1; i < deck.contents.length; i++) {
                if (i == deck.contents.length-1) printDeck += deck.contents[i].value;
                else printDeck += deck.contents[i].value + ', ';
            }
            message.channel.send(printDeck);
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