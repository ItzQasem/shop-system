const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const discord = require("discord.js");
const config = require("../../../jsons/config.json");
const logs = require("../../../jsons/logs.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear a number of messages in a channel")
     .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The number of messages you want to clear")
        .setRequired(true))
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel you want to clear messages from")
        .setRequired(false)
    ),
     /**
     * @param {discord.Client} client 
     * @param {discord.CommandInteraction} interaction 
    */
  async execute(client, interaction) {
    const channel = interaction.options.getChannel("channel") ?? interaction.channel;
    const logchannel = interaction.guild.channels.cache.get(logs.cleared);
    const amount = interaction.options.getInteger("amount");

    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      return interaction.reply({ content: "You do not have permission to manage messages.", ephemeral: true });
    }
    if (!logchannel) {
        return interaction.reply({ content: "logchannel required.", ephemeral: true });
      }

    if (!channel) {
      return interaction.reply({ content: "Please provide a valid channel to clear messages from.", ephemeral: true });
    }

    if (amount <= 0 || amount > 100) {
      return interaction.reply({ content: "You must clear at least 1 and no more than 100 messages.", ephemeral: true });
    }

    try {
      await channel.bulkDelete(amount + 1, true);

      const embed = new MessageEmbed()
        .setTitle("**Messages cleared**")
        .setDescription(`
          > **Channel** | ${channel} (${channel.id})
          > **Amount** | ${amount} messages
          > **Moderator** | ${interaction.user} (${interaction.user.id})
        `)
        .setColor(config.embedcolor);

       channel.send({ embeds: [embed] });
       interaction.reply({ content: `تم حذف ${amount} من الرسائل في شات ${channel}` });
    } catch (error) {
      return interaction.reply({ content: `An error occurred while trying to clear ${amount} messages in ${channel}. Error: \`\`\`${error}\`\`\``, ephemeral: true });
    }
  },
};