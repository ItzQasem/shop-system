const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js')
const config = require("../../../jsons/config.json")
module.exports = {
data: new SlashCommandBuilder()
    .setName('zajeel')
    .setDescription('send zajel to someones')
    .addUserOption(op => op.setName("user").setDescription("user to send zajel to").setRequired(true))
    .addStringOption(op => op.setName("message").setDescription("zajeel message").setRequired(true)),
    /**
     * @param {discord.Client} client 
     * @param {discord.CommandInteraction} interaction 
     */
    async execute(client, interaction) {
        if(interaction.guild) return interaction.reply({content: `الامر يعمل في الخاص البوت فقط !`, ephemeral: true});
        const user = interaction.options.getUser("user");
        const message = interaction.options.getString("message");
        const zajeelChannel = client.channels.cache.get(config.zajeelChannel)
        if(!zajeelChannel) return interaction.reply({content: `لا يوجد قناة الزاجل!`, ephemeral: true});
        if(interaction.channel.type === 'DM') {
        if(user.bot) return interaction.reply({content: `لا يمكنك ارسال زاجل الى بوت`, ephemeral: true});
        if(user.id === client.user.id) return interaction.reply({content: `لا يمكنك ارسال زاجل الي`, ephemeral: true});
        if(user.id === interaction.user.id) return interaction.reply({content: `لا يمكنك ارسال زاجل الى نفسك!`, ephemeral: true});
        const embed  = new discord.MessageEmbed()
        .setAuthor(interaction.user.username, interaction.user.displayAvatarURL({dynamic: true}))
        .setDescription(`**تم ارسال الزاجل الى ${user.username}**`)
        .setColor(`DARK_GREEN`)
        .setTimestamp()
        interaction.reply({embeds: [embed]}).then(() => {
          zajeelChannel.send({content: `${user} وصلك زاجل`,embeds: [new discord.MessageEmbed()
            .setDescription(`الرساله: **${message}**`)
            .setColor(config.embedcolor),
           ],
           })
        })
        }
    }
};