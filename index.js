//Libraries
const fs = require('fs');
const Discord = require('discord.js');

//Instancie a client, give they right
const client = new Discord.Client({
    intents:[
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});
//Instancie FileSystem management
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
 
for(const file of commandFiles) {
    const command = require('./commands/'+file);
    client.commands.set(command.name, command);
}

//prefix of commands
const prefix = '.';
const token = 'OTMxOTcxODk5Mjg0Njc2NzYw.YeMMdw.54yI5CbMB37ERn-8y5ELg5TeylE';

//Wait for client connection
client.once('ready', () => {
    console.log('Ready!');
});

//
client.on("messageCreate", (message) => {
    //if no message received
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase;

    //If incorrect command
    if(!client.command.has(command)) return;

    try{
        client.commands.get(command).execute(message, args);
        console.log(command);
    } catch(error){
        console.error(error);
        message.reply("An error as occurred: " + error.message);
    }
});

['eventHandler', 'commandHandler']

//Get Token in env variable
client.login(token);