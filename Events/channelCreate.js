const { Collection, Client, Message, ChannelManager, GuildChannel, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const delay = new Collection();
const ms = require('ms')
const config = require("../jsons/config.json")

module.exports = {
    name: 'channelCreate',
    on: true,
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {GuildChannel} channel 
     * 
     */
    async execute(client, channel) {
        if(config.claimCategories.includes(channel.parentId)){
            let embed = new MessageEmbed()
              .setColor(config.embedcolor)
              .setDescription(`**لاستلام التذكرة اضغط على ع الزر**`)
              .setThumbnail(channel.guild.iconURL({ dynamic: true }))
              .setTimestamp();
              const cliambuttons = new MessageButton()
              .setCustomId("claim")
              .setLabel("استلام")
              .setStyle("SUCCESS")
              const row = new MessageActionRow().addComponents(cliambuttons)
              setTimeout(() => {
                  channel.send({embeds: [embed], components: [row]})
              }, 2000)
        }
    }
}