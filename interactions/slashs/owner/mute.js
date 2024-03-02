const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const discord = require("discord.js");
const config = require("../../../jsons/config.json");
const logs = require("../../../jsons/logs.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mute a member")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The member you want to mute")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for muting the member")
        .setRequired(false)
    ),
    /**
     * @param {discord.Client} client 
     * @param {discord.CommandInteraction} interaction 
     */
  async execute(client, interaction) {
    const member = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason") || "No reason provided";
    const muteRole = interaction.guild.roles.cache.find((r) => r.name === "Muted");
    const logchannel = interaction.guild.channels.cache.get(logs.mute);

    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
      return interaction.reply({ content: "You do not have permission to manage roles.", ephemeral: true });
    }
    if (member.id === client.user.id){
        return interaction.reply({ content: "I cant mute myself!", ephemeral: true });
      }
      if (member.id === interaction.user.id){
        return interaction.reply({ content: "I cant mute you", ephemeral: true });
      }

    if (!member) {
      return interaction.reply({ content: "Please provide a valid member to mute.", ephemeral: true });
    }

    if (!muteRole) {
      return interaction.reply({ content: "Please create a mute role called 'Muted' and add it to a higher position than the member you want to mute.", ephemeral: true });
    }
    if (!logchannel) {
        return interaction.reply({ content: "logchannel required.", ephemeral: true });
      }
    

    try {
        if(member.roles.cache.has(muteRole.id))return interaction.reply({ content: `${member} Already muted.`, ephemeral: true });

        
      await member.roles.add(muteRole);
      const embed = new MessageEmbed()
        .setTitle("**Member muted**")
        .setDescription(`
          > **Member** | ${member} (${member.id})
          > **Reason** | ${reason}
          > **Moderator** | ${interaction.user} (${interaction.user.id})
        `)
        .setColor(config.embedcolor);
        interaction.reply({ content: `✅ ${member} muted from the text! 🤐`});
        logchannel.send({ embeds: [embed] });
    } catch (error) {
      return interaction.reply({ content: `An error occurred while trying to mute ${member}. Error: \`\`\`${error}\`\`\``, ephemeral: true });
    }
  },
};