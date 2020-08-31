// Import discord.js
const Discord = require('discord.js');

// Create an instance of a discord client
const client = new Discord.Client();

// The character that indicates a bot command
const prefix = '!';

// Import the file system
const fs = require('fs');
const config = require('./config');

// Define a new property to client
client.commands = new Discord.Collection();

// Get all javascript files in the commands folder
const commandFiles = fs.readdirSync('./commands/').filter(File => File.endsWith('.js'));
// Add all files from commandFiles into the client.commands collection
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

    try {
        switch (command){
            case 'hello':
                client.commands.get('hello').execute(message, args);
                break;
            case 'r':
            case 'roll':
                client.commands.get('roll').execute(message, args);
                break;
            default:
                message.channel.send("Do not waste my time with your foolish commands");
        }
    } catch(err) {
        message.channel.send(err);
    }
})

// Log out the bot
client.login(config.token);