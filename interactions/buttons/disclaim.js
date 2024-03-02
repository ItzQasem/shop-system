const discord = require("discord.js");
let config = require("../../jsons/config.json");
const {Database, JSONDriver} =  require("st.db");
const database = new Database({driver: new JSONDriver(`./database`)});
module.exports = {
  btn: "disclaim",
  /**
   * @param {discord.Client} client
   * @param {discord.ButtonInteraction} interaction
   */
  async execute(client, interaction) {
    let embed = new discord.MessageEmbed()
      .setDescription("لاستلام التكت اضغط على الزر ")
      .setColor("AQUA");
    let button = new discord.MessageButton()
      .setCustomId("claim")
      .setLabel("استلام")
      .setStyle("SUCCESS");
    let row = new discord.MessageActionRow().addComponents(button);
    let claimerID = interaction.message.embeds[0].footer.text;
    if (interaction.user.id != claimerID)
      return interaction.reply({
        content: "لم تستلم التذكره بعد!",
        ephemeral: true,
      });
      interaction.channel.edit({
      permissionOverwrites: [
        {
          type: "member",
          id: interaction.member.id,
          allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
        },
        {
          type: "role",
          id: config.staffRoleID,
          allow: ["SEND_MESSAGES"],
        },
      ],
    });
    interaction.reply({
      content: `تم ترك التذكرة من قبل ${interaction.member}`,
    });
      let points = await database.get(`claim_points_${interaction.member.id}`)
        if(points){
            database.set(`claim_points_${interaction.member.id}`, points-1)
        }
       
    // let points = await database.get(`claim_points_${interaction.member.id}`)
    // if(points!=null) database.set(`claim_points_${interaction.member.id}`, points-1)
        
    return interaction.message.edit({ embeds: [embed], components: [row] });
  },
};
