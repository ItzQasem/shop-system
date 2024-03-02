const {Client, Message, MessageEmbed, Permissions} = require('discord.js');
const config = require("../../jsons/config.json");
module.exports = {
    name: "say",
    description: "send message to a channel",
    aliases: ["ساي"],
    ownerOnly: true,
    /**
     * @param {Client} client 
     * @param {Message} message
     */
    async execute(client, message) {
    if(message.author.bot || !message.guild) return;
        let args = message.content.split(' ').slice(2).join(' ')
        if(!args)  return message.reply(`الاستخدام: \n${config.prefix}say \`#channel or id\` message `)
        let channel;
        if(message.mentions.channels.size > 0){
            channel = message.mentions.channels.first()
        } else {
            let channelID = message.content.split(' ')[1]
            if(channelID){
                channel = await client.channels.fetch(channelID).catch(e => null)
            }
            if(!channel){
                message.reply({content: `لم اعثر على هذا الشات 🙄`})
            }
        }
        message.delete()
      channel.send({content: `${args}`})
    },
};