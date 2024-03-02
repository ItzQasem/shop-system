const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const discord = require("discord.js");
const config = require("../../../jsons/config.json");
let ms = require("ms");
const logs = require("../../../jsons/logs.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout a member")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to timeout")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("The time you want to timeout the user in seconds")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the timeout")
        .setRequired(false)
    ),
    /**
     * @param {discord.Client} client 
     * @param {discord.CommandInteraction} interaction 
     */
  async execute(client, interaction) {
    const member = interaction.options.getMember("user");
    const time = interaction.options.getInteger("time") ?? 5;
    const reason = interaction.options.getString("reason") || "No reason provided";
    const logchannel = interaction.guild.channels.cache.get(logs.timeout);
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
      return interaction.reply({
        content: "You do not have permission to manage roles.",
        ephemeral: true,
      });
    }

    if (!member) {
      return interaction.reply({
        content: "Please provide a valid member to timeout.",
        ephemeral: true,
      });
    }

    if (member.id === interaction.user.id) {
      return interaction.reply({
        content: "You cannot timeout yourself.",
        ephemeral: true,
      });
    }
    if (member.id === client.user.id) {
        return interaction.reply({
          content: "I cannot timeout myself.",
          ephemeral: true,
        });
      }

    try {
      await member.timeout(time * 60000, reason);
      const embed = new MessageEmbed()
        .setTitle("**Member timed out**")
        .setDescription(`
          > **Member** | ${member} (${member.id})
          > **Reason** | ${reason}
          > **Time** | ${time} minutes
          > **Moderator** | ${interaction.user} (${interaction.user.id})
        `)
        .setColor(config.embedcolor);
        interaction.reply({content: `**✅ ${member} has been timed out!**`});
       logchannel.send({ embeds: [embed] });
    } catch (error) {
      return interaction.reply({
        content: `An error occurred while trying to timeout ${member}. Error: \`\`\`${error}\`\`\``,
        ephemeral: true,
      });
    }
  },
};