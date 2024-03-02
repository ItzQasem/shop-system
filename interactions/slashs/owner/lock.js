const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const discord = require("discord.js");
const config = require("../../../jsons/config.json");
const logs = require("../../../jsons/logs.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Lock a channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel you want to lock")
        .setRequired(false)
    ),
     /**
     * @param {discord.Client} client 
     * @param {discord.CommandInteraction} interaction 
    */
  async execute(client, interaction) {
    const channel = interaction.options.getChannel("channel") ?? interaction.channel;
    const logchannel = interaction.guild.channels.cache.get(logs.lock);
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      return interaction.reply({ content: "You do not have permission to manage channels.", ephemeral: true });
    }

    if (!channel) {
      return interaction.reply({ content: "Please provide a valid channel to lock.", ephemeral: true });
    }
    if (!logchannel) {
      return interaction.reply({ content: "logchannel required.", ephemeral: true });
    }


    if (!channel.permissionsFor(interaction.guild.me).has([Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL])) {
      return interaction.reply({ content: "I do not have permission to send messages or view the channel.", ephemeral: true });
    }

    try {
      await channel.permissionOverwrites.edit(interaction.guild.id, {
        SEND_MESSAGES: false,
      });

      const embed = new MessageEmbed()
        .setTitle("**Channel locked**")
        .setDescription(`
          > **Channel** | ${channel} (${channel.id})
          > **Moderator** | ${interaction.user} (${interaction.user.id})
        `)
        .setColor(config.embedcolor)
        .setTimestamp()

       logchannel.send({ embeds: [embed] });
       interaction.reply({ content: `🔒 ${channel} has been locked.`});
    } catch (error) {
      return interaction.reply({ content: `An error occurred while trying to lock ${channel}. Error: \`\`\`${error}\`\`\``, ephemeral: true });
    }
  },
};