const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const discord = require("discord.js");
const config = require("../../../jsons/config.json");
const logs = require("../../../jsons/logs.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("Unlock a channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel you want to unlock")
        .setRequired(true)
    ),
  async execute(client, interaction) {
    const channel = interaction.options.getChannel("channel");
    const logchannel = interaction.guild.channels.cache.get(logs.unlock);

    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      return interaction.reply({ content: "You do not have permission to manage channels.", ephemeral: true });
    }

    if (!channel) {
      return interaction.reply({ content: "Please provide a valid channel to unlock.", ephemeral: true });
    }

    if (!channel.permissionsFor(interaction.guild.me).has([Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL])) {
      return interaction.reply({ content: "I do not have permission to send messages or view the channel.", ephemeral: true });
    }

    try {
      await channel.permissionOverwrites.edit(interaction.guild.id, {
        SEND_MESSAGES: null,
      });

      const embed = new MessageEmbed()
        .setTitle("**Channel unlocked**")
        .setDescription(`
          > **Channel** | ${channel} (${channel.id})
          > **Moderator** | ${interaction.user} (${interaction.user.id})
        `)
        .setColor(config.embedcolor)
        .setTimestamp();
        logchannel.send({ embeds: [embed] });
        interaction.reply({ content: `🔓 ${channel} has been unlocked.`});
    } catch (error) {
      return interaction.reply({ content: `An error occurred while trying to unlock ${channel}. Error: \`\`\`${error}\`\`\``, ephemeral: true });
    }
  },
};