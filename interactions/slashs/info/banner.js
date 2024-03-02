const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js')

module.exports = {
data: new SlashCommandBuilder()
    .setName('banner')
    .setDescription('show your banner or someone\'s banner')
    .addUserOption(op => op.setName("user").setDescription("user for banner")),
    /**
     * @param {discord.Client} client 
     * @param {discord.CommandInteraction} interaction 
     */
    async execute(client, interaction) {
        if(!interaction.guild) return;
        let user = interaction.options.getUser("user") ?? interaction.user;
        const fetchUser = await client.users.fetch(user.id);
        const member = await fetchUser.fetch(fetchUser.id)
        const embed  = new discord.MessageEmbed()
        .setAuthor(member.username, member.displayAvatarURL({dynamic: true, size: 2048}))
        .setTitle('banner link')
        .setURL(member.bannerURL({format: 'png' ? 'png' : 'gif',dynamic: true, size: 2048 }))
        .setColor(member.hexAccentColor)
        .setImage(member.bannerURL({format: 'png' ? 'png' : 'gif',dynamic: true, size: 2048 }))
        .setTimestamp()
        .setFooter(interaction.member.user.username, interaction.member.displayAvatarURL({dynamic: true}));
        
        const embed2 = new discord.MessageEmbed()
        .setAuthor(member.username, member.displayAvatarURL({dynamic: true, size: 2048}))
        .setColor(member.hexAccentColor)
        .setDescription(`user have not a banner`)
        .setTimestamp()
        .setFooter(interaction.member.user.username, interaction.member.displayAvatarURL({dynamic: true}));
       if(member.bannerURL()){
           interaction.reply({embeds: [embed]});
       }else {
           interaction.reply({embeds: [embed2]});
       }
    }
};