const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js')

module.exports = {
data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('show your bot\'s ping'),
    /**
     * @param {discord.Client} client 
     * @param {discord.CommandInteraction} interaction 
     */
    async execute(client, interaction) {
        if(!interaction.guild) return;
        const embed  = new discord.MessageEmbed()
        .setAuthor(interaction.user.username, interaction.user.displayAvatarURL({dynamic: true}))
        .setDescription(`** - Bot api latencey is: ${client.ws.ping}ms**`)
        .setColor(`DARK_GREEN`)
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}));
        interaction.reply({embeds: [embed]});
    }
};