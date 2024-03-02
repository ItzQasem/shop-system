const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const discord = require("discord.js");
const config = require("../../../jsons/config.json");
const logs = require("../../../jsons/logs.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setnick")
    .setDescription("Set the nickname of a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to set the nickname of")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("nickname")
        .setDescription("The nickname you want to set")
        .setRequired(true)
    ),
    /**
     * @param {discord.Client} client 
     * @param {discord.CommandInteraction} interaction 
     */
  async execute(client, interaction) {
    const member = interaction.options.getMember("user");
    const nickname = interaction.options.getString("nickname");
    const logchannel = interaction.guild.channels.cache.get(logs.nickname);

    if (!member.permissions.has(Permissions.FLAGS.CHANGE_NICKNAME)) {
      return interaction.reply({
        content: `You do not have permission to change the nickname of ${member}`,
        ephemeral: true,
      });
    }
    if(!logchannel)return interaction.reply({content: `logchannel required`, ephemeral: true})

    try {
      await member.setNickname(nickname);
      const embed = new MessageEmbed()
        .setTitle("**Nickname channged**")
        .setDescription(`
          > **Member** | ${member} (${member.id})
          > **Reason** | ${reason}
          > **Moderator** | ${interaction.user} (${interaction.user.id})
        `)
        .setColor(config.embedcolor);
        interaction.reply({
          content: `Successfully set the nickname of ${member} to ${nickname}`,
        });
        logchannel.send({ embeds: [embed] });
    } catch (error) {
      return interaction.reply({
        content: `An error occurred while trying to set the nickname of ${member}: ${error}`,
        ephemeral: true,
      });
    }
  },
};