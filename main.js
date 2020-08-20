// Import discord.js
const Discord = require('discord.js');

// Create an instance of a discord client
const client = new Discord.Client();

// The character that indicates a bot command
const prefix = '!';

// 
const fs = require('fs');

// 
client.commands = new Discord.Collection();

// 
const commandFiles = fs.readdirSync('./commands/').filter(File => File.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

// After this the bot will react to discord information
client.once('ready', () => {
    console.log('StrahdBot is online!');
})

// Create an event listener for messages
client.on('message', message => {
    // Ignore messages that don't start with the command prefix or are from a bot
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    // Remove the prefix and return an array of strings into args (space delimited)
    const args = message.content.slice(prefix.length).split(/ +/);
    // Remove and return the first element of the args array
    const command = args.shift().toLowerCase();

    switch (command){
        case 'hello':
            client.commands.get('hello').execute(message, args);
            break;
        case 'r':
        case 'roll':
            client.commands.get('roll').execute(message, args);
            break;
    }
})

// Log out the bot
client.login('NzQ1ODI4NDgyMTcyNDUyODc1.Xz3c5g.rHvBtjzSwrJUGO-FmzAPbPFfWSo');