const {Client, Message} = require('discord.js');
const config = require("../../jsons/config.json");
module.exports = {
    name: "line",
    aliases: ["خط", "خطط"],
    /**
     * @param {Client} client 
     * @param {Message} message
     */
    async execute(client, message) {
        message.delete()
          message.channel.send({files: [config.line]})

    },
};