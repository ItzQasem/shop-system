const discord = require('discord.js')
module.exports = {
    name: "first",
    /**
     * @param {discord.Client} client 
     * @param {discord.ModalMessageModalSubmitInteraction} interaction 
     */
    async execute(client, interaction) {
        let first = interaction.fields.getTextInputValue("1");
        let second = interaction.fields.getTextInputValue("2");
        interaction.reply({content: `${first}\n${second}`})
        
    },
};