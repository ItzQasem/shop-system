const discord = require("discord.js");
let config = require("../../jsons/config.json");
module.exports = {
  btn: "apply",
  /**
   * @param {discord.Client} client
   * @param {discord.ButtonInteraction} interaction
   */
  async execute(client, interaction) {
    let apply_Role = interaction.guild.roles.cache.get(config.apply.acceptedRole)
    if(apply_Role && interaction.member.roles.cache.has(apply_Role.id)) return interaction.reply({content: `انت ادارة بالفعل!`, ephemeral: true});
    const modal = new discord.Modal()
    .setCustomId("apply")
    .setTitle("تقديم")
    const qustion1 = new discord.TextInputComponent()
    .setCustomId("qustion1Input")
    .setLabel(`${config.apply.qustion1}`)
    .setStyle("PARAGRAPH")
    .setRequired(true)
    const qustion2 = new discord.TextInputComponent()
    .setCustomId("qustion2Input")
    .setLabel(`${config.apply.qustion2}`)
    .setStyle("PARAGRAPH")
    .setRequired(true)
    const qustion3 = new discord.TextInputComponent()
    .setCustomId("qustion3Input")
    .setLabel(`${config.apply.qustion3}`)
    .setStyle("PARAGRAPH")
    .setRequired(true)
    const qustion4 = new discord.TextInputComponent()
    .setCustomId("qustion4Input")
    .setLabel(`${config.apply.qustion4}`)
    .setStyle("PARAGRAPH")
    .setRequired(true)
    const qustion5 = new discord.TextInputComponent()
    .setCustomId("qustion5Input")
    .setLabel(`${config.apply.qustion5}`)
    .setStyle("PARAGRAPH")
    .setRequired(true)

    const row1 = new discord.MessageActionRow()
    .addComponents(qustion1)
    const row2 = new discord.MessageActionRow()
    .addComponents(qustion2)
    const row3 = new discord.MessageActionRow()
    .addComponents(qustion3)
    const row4 = new discord.MessageActionRow()
    .addComponents(qustion4)
    const row5 = new discord.MessageActionRow()
    .addComponents(qustion5)
    modal.addComponents(row1, row2, row3, row4, row5) 
    await interaction.showModal(modal)
  },
};
