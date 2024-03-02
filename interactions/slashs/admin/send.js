const { SlashCommandBuilder } = require("@discordjs/builders");
const discord = require("discord.js");
let config = require("../../../jsons/config.json");

module.exports = {
  staff: true,
  data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("send message to a member")
    .addUserOption((op) =>
      op.setName("user").setDescription("mention or id").setRequired(true))
      .addStringOption((op) =>
      op.setName("message").setDescription("message").setRequired(true))
      .addStringOption((op) =>
    op.setName("type").setDescription("message type").setRequired(true).addChoices(
      {name: 'Embed', value: "embed"},
      {name: 'Content', value: "content"}
    )),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    if (!interaction.guild) return;
    await interaction.deferReply();
    let user = interaction.options.getUser("user");
    let type = interaction.options.getString("type");
    let message = interaction.options.getString("message");

    let member = interaction.guild.members.cache.get(user.id);
    let channel = interaction.channel;
    if(type === "embed"){
member.send({embeds: [new discord.MessageEmbed().setAuthor(
                interaction.user.username,
                interaction.user.displayAvatarURL({ dynamic: true })
              )
              .setDescription(`الرساله: ${message}\n الاداري: ${interaction.member}`)
              .setColor("AQUA"),
          ],
        }).catch((e) => {
            interaction.editReply({
              content: "لم اتمكن من ارسال النداء المستخدم غالق الخاص",
            });
          });
    } else if(type === "content"){
        member.send({content: `${message}`})
    }
 
    interaction.editReply(`تم ارسال الرساله الى ${user} `);
  },
};
