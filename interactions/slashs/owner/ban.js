const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed, Permissions } = require("discord.js");
const discord = require('discord.js')
const config = require("../../../jsons/config.json")
const logs = require("../../../jsons/logs.json")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('ban members')
        .addUserOption(user => user
            .setName('user')
            .setDescription('Mention the user you want to ban')
            .setRequired(false)
        )
        .addStringOption(reason => reason
            .setName('reason')
            .setDescription('Reason for banning him?')
            .setRequired(false)
        )
    ,
    /**
     * @param {discord.Client} client 
     * @param {discord.CommandInteraction} interaction 
     */
    async execute(client, interaction) {
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') ?? "No reason provided";
        const channel = interaction.guild.channels.cache.get(logs.ban);

        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            return interaction.reply({ content: 'You do not have permission to ban members.', ephemeral: true});
        }

        if (!member) {
            return interaction.reply({ content: 'Please provide a valid member to ban.', ephemeral: true });
        }
        if (!channel) {
            return interaction.reply({ content: 'Invalid channel ID.', ephemeral: true});
        }

        if (member.id === interaction.user.id) {
            return interaction.reply({ content: 'You cannot ban yourself.', ephemeral: true});
        }

        if (member.id === client.user.id) {
            return interaction.reply({ content: 'You cannot ban me.', ephemeral: true });
        }

        try {
            await member.ban({ reason: reason });

            const embed = new MessageEmbed()
            .setTitle("**Member banned**")
                .setDescription(`
              > **Member** | ${member} (${member.id})
              > **Reason** | ${reason}
              > **Moderator** | ${interaction.user} (${interaction.user.id})
            `)
            .setColor(config.embedcolor)
        
            channel.send({ embeds: [embed] });
            return await interaction.reply({ content: `${member} has been Successfully banned.` });
        } catch (error) {
            return await interaction.reply({ content: `An error occurred while trying to ban ${member}. Error: \`\`\`${error}\`\`\``, ephemeral: true});
        }
    }
} 