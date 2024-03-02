const {Client, Message, MessaeEmbed} = require('discord.js');
const config = require("../../jsons/config.json");
module.exports = {
    name: "colors",
    description: "show available colors",
    aliases: ["الوان"],
    /**
     * @param {Client} client 
     * @param {Message} message
     */
    async execute(client, message) {
        if(!message.guild || message.author.bot)return;
      message.channel.send({content: `${config.colorspic}`})
    },
};