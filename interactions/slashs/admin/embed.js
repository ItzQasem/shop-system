const { SlashCommandBuilder } = require("@discordjs/builders");
const discord = require("discord.js");
const config = require("../../../jsons/config.json");

module.exports = {
  staff: true,
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("send an embed in channel")
    .addStringOption((op) =>
      op.setName("title").setDescription("Embed Title").setRequired(true)
    )
    .addStringOption((op) =>
      op
        .setName("description")
        .setDescription("Embed Description")
        .setRequired(true)
    )
    .addChannelOption((op) =>
      op
        .setName("channel")
        .setDescription("channel where embed send")
        .setRequired(false)
    )
    .addStringOption((op) =>
      op
        .setName("color")
        .setDescription(
          "Embed color ex: WHITE, BLUE, RED etc (all leters are capital)"
        )
        .setRequired(false)
    )
    .addAttachmentOption((op) =>
      op.setName("image").setDescription("Embed Image").setRequired(false)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    if (!interaction.guild) return;
    await interaction.deferReply({ ephemeral: true });
    const channel =
      interaction.options.getChannel("channel") ?? interaction.channel;
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const image = interaction.options.getAttachment("image");
    const color = interaction.options.getString("color") ?? "BLACK";
    const embed = new discord.MessageEmbed()
      .setAuthor(
        interaction.guild.name,
        interaction.guild.iconURL({ dynamic: true })
      )
      .setTitle(`${title}`)
      .setDescription(`**${description}**`)
      .setColor(`${color}`)
      .setTimestamp()
      .setFooter(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      );
    if (image && image.url) {
      embed.setImage(image.url);
    }
    channel
      .send({ embeds: [embed] })
      .then(() => {
        interaction.editReply({ content: `تم ارسال الامبد بنجاح ✅` });
      })
      .catch((e) => {
        interaction.editReply({
          content: "خطا في ارسال الامبد تاكد من المعلومات",
        });
      });
  },
};
