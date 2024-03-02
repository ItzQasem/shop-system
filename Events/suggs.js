const { prefix } = require("../jsons/config.json");
const { Collection, Client, Message, MessageEmbed } = require("discord.js");
const delay = new Collection();
const ms = require("ms");
const config = require("../jsons/config.json");

module.exports = {
  name: "messageCreate",
  on: true,
  /**
   * @param {Client} client
   * @param {Message} message
   */
  async execute(client, message) {
    if (
      config.suggestions.channelID.includes(message.channel.id) &&
      !message.author.bot
    ) {
      let args = message.content.split(" ");
      let suggestions = args.slice(0).join(" ");

      let embed = new MessageEmbed()
        .setAuthor({
          name: message.author.username,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setColor(config.embedcolor)
        .setDescription(`**${message.author}, suggestion\n\n${suggestions}**`)
        .setThumbnail(message.member.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
       
      message.delete();
      message.channel.send({
        content: `${message.author}** شكرا لك على رأيك 💚**`,
        embeds: [embed],
      });
    }
  },
};
