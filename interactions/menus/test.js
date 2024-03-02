const discord = require('discord.js')
module.exports = {
    menu: "menu",
    /**
     * @param {discord.Client} client 
     * @param {discord.SelectMenuInteraction} interaction 
     */
    async execute(client, interaction) {
        if(interaction.values == "1"){
            interaction.reply({content: `first`})
        } else if(interaction.values == "2"){
            interaction.reply({content: `second`})
        } else {
            interaction.reply({content: `not Defiend`, ephemeral: true})
        }
    },
};