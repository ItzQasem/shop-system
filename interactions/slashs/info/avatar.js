const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js')

module.exports = {
data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('show your avatar or someone\'s avatar')
    .addUserOption(op => op.setName("user").setDescription("user to show avatar for")),
    /**
     * @param {discord.Client} client 
     * @param {discord.CommandInteraction} interaction 
     */
    async execute(client, interaction) {
        if(!interaction.guild) return;
        let user = interaction.options.getUser("user") ?? interaction.member;
        const fetchUser = await client.users.fetch(user.id);
        const member = await fetchUser.fetch()
        const embed  = new discord.MessageEmbed()
        .setAuthor(member.username, member.displayAvatarURL({format: 'png' , dynamic: true, size: 2048}))
        .setTitle(`${member.username} Avatar`)
        .setURL(member.displayAvatarURL({format: 'gif' ? 'gif' : 'png' , dynamic: true, size: 2048}))
        .setColor(member.hexAccentColor)
        .setImage(member.displayAvatarURL({format: 'gif' ? 'gif' : 'png' , dynamic: true, size: 2048}))
        .setTimestamp()
        .setFooter(interaction.member.user.username, interaction.member.displayAvatarURL({dynamic: true}));
        interaction.reply({embeds: [embed]});
    }
};