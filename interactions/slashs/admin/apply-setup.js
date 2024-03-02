const { SlashCommandBuilder } = require("@discordjs/builders");
const discord = require("discord.js");
let config = require("../../../jsons/config.json");

module.exports = {
  staff: true,
  data: new SlashCommandBuilder()
    .setName("apply-setup")
    .setDescription("setup for submition")
    .addChannelOption((op) =>
    op.setName("channel").setDescription("chanel to send applies").setRequired(false))
      .addAttachmentOption((op) =>
      op.setName("image").setDescription("image for embed").setRequired(false)),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    try{
    if (!interaction.guild) return;
    await interaction.deferReply({ephemeral: true});
    let ModerationRoles = config.apply.ModerationRoles
    let acceptedRole = config.apply.acceptedRole
    let channel = interaction.options.getChannel("channel")?? interaction.channel;
    let image = interaction.options.getAttachment("image");
    if(!channel.isText()) return await interaction.editReply({content: `يجب ان يكون الشات قابل للكتابه`});
    const embed = new discord.MessageEmbed()
        .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})})
        .setColor(config.embedcolor)
        .setTimestamp()
        .setDescription(`**للتقديم املئ المعلومات الاتيه: \n${config.apply.qustion1}\n${config.apply.qustion2}\n${config.apply.qustion3}\n${config.apply.qustion4}\n${config.apply.qustion5}**`)
        .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: true})})
        if(image) embed.setImage(image.url);
        const applyButton = new discord.MessageButton()
        .setCustomId("apply")
        .setLabel("تقديم")
        .setStyle("SECONDARY")
        .setEmoji("🎫")
        const row = new discord.MessageActionRow()
        .addComponents(applyButton)
        channel.send({embeds: [embed], components: [row]});
        await interaction.editReply({content: `تم الاعداد والارسال لنظام التقديم`});
      }catch(e){
        await interaction.editReply({content: `خطا في الارسال`})
        console.log(e)
      }
  },
};
