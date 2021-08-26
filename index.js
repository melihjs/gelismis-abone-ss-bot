const { Client, MessageEmbed } = require('discord.js');
const disbut = require('discord-buttons');
const client = new Client();
require('discord-buttons')(client);
const channel = ""; // abone kanalı id
const log = ""; // abone log kanalı id
const rol = ""; // abone rol id
const size = "1"; // öylesine bunu 1 olarak bırakın ellemeyin bozulur
const yes = ""; // evet emoji id
const no = ""; // hayır emoji id
const admin = ""; // abone sorumlusu id
client.log = (channelID, options) => client.channels.cache.get(channelID).send(options);

client.on('ready', async () => console.log('ready'));

client.on('message', async (message) => {
  if (!message.guild) return;
  if (message.channel.id == channel) {
    if (message.attachments.size < size) return;
    if (message.member.roles.cache.has(rol)) return;
    var yes2 = new disbut.MessageButton()
    .setStyle('green')
    .setLabel('')
    .setEmoji(yes)
    .setID('yes');
    var no2 = new disbut.MessageButton()
    .setStyle('red')
    .setLabel('')
    .setEmoji(no)
    .setID('no');
    var row = new disbut.MessageActionRow()
    .addComponents([ yes2, no2 ]);
    var embed = new MessageEmbed()
    .setTitle('Abone Rol')
    .setDescription(`**${message.author.tag}** adlı kullanıcıya abone rolü verilsin mi :question:`)
    .setColor('#5555dd')
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
    return message.channel.send(`<@&${admin}>`, { embed: embed, components: [ row ] }).then(s => {
      var filter = (button) => {
        return message.guild.members.cache.get(button.clicker.member.id).roles.cache.has(admin) && !button.clicker.user.bot;
      }
      var collector = s.createButtonCollector(filter, {});
      async function verildi() {
        var yesEmbed = new MessageEmbed()
        .setTitle('Abone Rol')
        .setDescription(`:star2: **${message.author.tag}** adlı kullanıcıya abone rolü verildi.`)
        .setColor('#5555dd')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
        s.edit(`<@&${admin}>`, { embed: yesEmbed, components: null }).then(d => d.delete({ timeout: 1500 }));
        message.member.roles.add(rol);
        var logEmbed = new MessageEmbed()
        .setTitle('Abone Rol')
        .setDescription(`:star2: **${message.author.tag}** adlı kullanıcıya abone rolü verildi.`)
        .setColor('#5555dd')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
        client.log(log, { embed: logEmbed });
      }
      async function iptal_edildi() {
        var logEmbed2 = new MessageEmbed()
        .setTitle('Abone Rol')
        .setDescription(`:x: Kullanıcıya abone rolü verilmesi iptal edildi.`)
        .setColor('#5555dd')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
        var logEmbed2 = new MessageEmbed()
        .setTitle('Abone Rol')
        .setDescription(`:x: **${message.author.tag}** adlı kullanıcıya abone rolü verilmesi iptal edildi.`)
        .setColor('#5555dd')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
        s.edit(`<@&${admin}>`, { embed: noEmbed, components: null }).then(d => d.delete({ timeout: 1500 }));
        client.log(log, { embed: logEmbed2 });
      }
      collector.on('collect', async (button) => {
        button.reply.defer();
        if (button.id == "yes") {
          return verildi();
        } else if (button.id == "no") {
          return iptal_edildi();
        }
      });
    }); 
  } else {
    return;
  }
});

client.login('token');
