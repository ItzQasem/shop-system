const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed, Permissions } = require("discord.js");
const discord = require('discord.js')
const config = require("../../../jsons/config.json")
const logs = require("../../../jsons/logs.json")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('unban banned members')
        .addUserOption(user => user
            .setName('user')
            .setDescription('Mention the user you want to unban')
            .setRequired(true)
        )
    ,
    /**
     * @param {discord.Client} client 
     * @param {discord.CommandInteraction} interaction 
     */
    async execute(client, interaction) {
        const member = interaction.options.getUser('user');
        const channel = interaction.guild.channels.cache.get(logs.unBan);

        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            return interaction.reply({ content: `You do not have permission to unban members. require \`${Permissions.FLAGS.BAN_MEMBERS}\` permissions`, ephemeral: true});
        }
        if (!channel) {
            return interaction.reply({ content: 'Invalid channel ID.', ephemeral: true});
        }
        if (member.id === interaction.user.id) {
            return interaction.reply({ content: 'You cannot unban yourself.', ephemeral: true});
        }

        if (member.id === client.user.id) {
            return interaction.reply({ content: 'I\'m not banned!', ephemeral: true });
        }

        try {
            let banChech = await interaction.guild.bans.fetch(member.id)
            if(!banChech) {
                return await interaction.reply({ content: `${member} Not banned.` });
            }
            await interaction.guild.bans.remove(member.id);
            const embed = new MessageEmbed()
            .setTitle("**Member Unbanned**")
                .setDescription(`
              > **Member** | ${member} (${member.id})
              > **Moderator** | ${interaction.user} (${interaction.user.id})
            `)
            .setColor(config.embedcolor)
        
            await channel.send({ embeds: [embed] });
            return await interaction.reply({ content: `${member} has been Successfully unbanned.` });
        } catch (error) {
            return await interaction.reply({ content: `An error occurred while trying to ban ${member}. Error: \`\`\`${error}\`\`\``, ephemeral: true});
        }
    }
} 