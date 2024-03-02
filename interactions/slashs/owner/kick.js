const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const discord = require("discord.js");
const config = require("../../../jsons/config.json");
const logs = require("../../../jsons/logs.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a member")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for kicking the user")
        .setRequired(false)
    ),
    /**
     * @param {discord.Client} client 
     * @param {discord.CommandInteraction} interaction 
    */
  async execute(client, interaction) {
    const member = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason") || "No reason provided";
    const channel = interaction.guild.channels.cache.get(logs.kick);

    if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      return interaction.reply({ content: "You do not have permission to kick members.", ephemeral: true });
    }

    if (!member) {
      return interaction.reply({ content: "Please provide a valid member to kick.", ephemeral: true });
    }
    if (!channel) {
      return interaction.reply({ content: "Invalid channel ID.", ephemeral: true });
    }

    if (member.id === interaction.user.id) {
      return interaction.reply({ content: "You cannot kick yourself.", ephemeral: true });
    }

    if (member.id === client.user.id) {
      return interaction.reply({ content: "You cannot kick me.", ephemeral: true });
    }

    try {
      await member.kick(reason);

      const embed = new MessageEmbed()
        .setTitle("**Member kicked**")
        .setDescription(`
          > **Member** | ${member} (${member.id})
          > **Reason** | ${reason}
          > **Moderator** | ${interaction.user} (${interaction.user.id})
        `)
        .setColor(config.embedcolor);

      channel.send({ embeds: [embed] });
      return interaction.reply({ content: `${member} has been successfully kicked.` });
    } catch (error) {
      return interaction.reply({ content: `An error occurred while trying to kick ${member}. Error: \`\`\`${error}\`\`\``, ephemeral: true });
    }
  },
};