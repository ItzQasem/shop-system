const discord = require('discord.js')
module.exports = {
    btn: "button",
    /**
     * @param {discord.Client} client 
     * @param {discord.ButtonInteraction} interaction 
     */
   async execute(client, interaction) {
        interaction.reply({content: `test`})
    },
};