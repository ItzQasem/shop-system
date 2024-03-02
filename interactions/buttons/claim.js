const discord = require('discord.js')
let config = require("../../jsons/config.json");
const {Database, JSONDriver} =  require("st.db")
const database = new Database({driver: new JSONDriver(`./database`)})
module.exports = {
    btn: "claim",
    staff: true,
    /**
     * @param {discord.Client} client 
     * @param {discord.ButtonInteraction} interaction 
     * @param {discord.GuildChannel} channel 
     */
   async execute(client, interaction, channel) {
        interaction.channel.edit({
            permissionOverwrites: [
                {
                type: "member", 
                id: interaction.member.id,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                type: "role", 
                id: config.staffRoleID,
                deny: ["SEND_MESSAGES"]
                }
            ]
        })
        let embed = new discord.MessageEmbed()
          .setDescription(`تم استلام التذكرة من قبل ${interaction.member}`)
          .setFooter({text: interaction.user.id})
          .setColor('AQUA')
          let button = new discord.MessageButton()
          .setCustomId('disclaim')
          .setLabel('ترك')
          .setStyle('DANGER')
          let row = new discord.MessageActionRow()
          .addComponents(button)
        interaction.reply({content: `تم استلام التذكرة من قبل ${interaction.member}`})
        let points = database.get(`claim_points_${interaction.member.id}`)
        if(!points){
            database.set(`claim_points_${interaction.member.id}`, 1)
        } else {
            database.add(`claim_points_${interaction.member.id}`, 1)
        }
        return interaction.message.edit({embeds: [embed], components: [row]})
    
    },
};