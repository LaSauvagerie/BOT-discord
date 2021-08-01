const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.js')
console.log(config)


client.on('ready', () => {
 console.log('bot près.');
});

client.on('message', (message) => {
 console.log(message.content);
});

client.on('message', (message) => {
 let args = message.content.split(" ");
 let command = args.shift().toLowerCase();

   if(!command.startsWith(config.prefix)) return;

switch(command) {
 case config.prefix + 'ping':
   require('./command/ping.js').execute(client, message, args);
   break;

   case config.prefix + 'help':
   require('./command/help.js').execute(client, message, args);
   break;

   case config.prefix + 'embed':
   require('./command/embed.js').execute(client, message, args);
   break;

   default: break;
  }
});

client.on('messageReactionAdd', (reaction, user) => {
 console.log("L'utilisateur " + user.tag +" à ajouté la reaction " + reaction.emoji.name);
});

client.on('messageReactionRemove', (reaction, user) => {
 console.log("L'utilisateur " + user.tag +" à supprimé la reaction " + reaction.emoji.name);
})

// id: 871282329413357588
// role: 871282578613751828

client.on('guildMemberAdd', (member) => {
 // Lorsqu'un utilisateur rejoint.
let welcomeChannel = client.channels.cache.get('config.welcomeChannel');
welcomeChannel.send('Installe toi bien chez nous, ' + member.user.tag + ' !'); // tag == User#1234

member.roles.add('config.autoRole');

member.send('Bienvenue dans notre serveur la sauvagerie tout simplement si tu essaye de faire des chose interdit on te dox tu fini sur telegram bonne continuation');
});

client.on('guildMemberRemove',(member) => {
 // Lorsqu'un utilisateur quitte.
  let leaveChannel = client.channels.cache.get('config.leaveChannel')
  leaveChannel.send('Dommage Au revoir, ' + member.user.tag +' ! :\'(')
});



client.login(config.token);