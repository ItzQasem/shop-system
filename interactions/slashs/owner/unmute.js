const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const discord = require("discord.js");
const config = require("../../../jsons/config.json");
const logs = require("../../../jsons/logs.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Unmute a member")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The member you want to unmute")
        .setRequired(true)
    ),
    /**
     * @param {discord.Client} client 
     * @param {discord.CommandInteraction} interaction 
     */
  async execute(client, interaction) {
    const member = interaction.options.getMember("user");
    const muteRole = interaction.guild.roles.cache.find((r) => r.name === "Muted");
    const logchannel = interaction.guild.channels.cache.get(logs.unMute);

    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
      return interaction.reply({ content: "You do not have permission to manage roles.", ephemeral: true });
    }
    if (!member) {
      return interaction.reply({ content: "Please provide a valid member to unmute.", ephemeral: true });
    }

    if (!muteRole) {
      return interaction.reply({ content: "There is no mute role in this server.", ephemeral: true });
    }
    if (!logchannel) {
        return interaction.reply({ content: "logchannel required.", ephemeral: true });
      }

    try {
        if(!member.roles.cache.has(muteRole.id)) return interaction.reply({ content: `${member} have not muted yet!`});

        
      await member.roles.remove(muteRole);
      const embed = new MessageEmbed()
        .setTitle("**Member unmuted**")
        .setDescription(`
          > **Member** | ${member} (${member.id})
          > **Moderator** | ${interaction.user} (${interaction.user.id})
        `)
        .setColor(config.embedcolor);
        interaction.reply({ content: `✅ ${member} unmuted!`});
        logchannel.send({ embeds: [embed] });
    } catch (error) {
        if (error.code === 50013) {
            return interaction.reply({ content: `I cannot unmute ${member} because I am missing the permission \`Manage Roles\`.`, ephemeral: true });
          }
      return interaction.reply({ content: `An error occurred while trying to unmute ${member}. Error: \`\`\`${error}\`\`\``, ephemeral: true });
    }
  },
};