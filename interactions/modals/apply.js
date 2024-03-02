const discord = require('discord.js');
let config = require("../../jsons/config.json");
module.exports = {
    name: "apply",
    /**
     * @param {discord.Client} client 
     * @param {discord.ModalMessageModalSubmitInteraction} interaction 
     */
    async execute(client, interaction) {
        await interaction.deferReply({ephemeral: true})
        let qustion1Input = interaction.fields.getTextInputValue("qustion1Input");
        let qustion2Input = interaction.fields.getTextInputValue("qustion2Input");
        let qustion3Input = interaction.fields.getTextInputValue("qustion3Input");
        let qustion4Input = interaction.fields.getTextInputValue("qustion4Input");
        let qustion5Input = interaction.fields.getTextInputValue("qustion5Input");
        const applyChannel = config.apply.applyChannel;
        const channel = interaction.guild.channels.cache.get(applyChannel)
        const embed = new discord.MessageEmbed()
        .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})})
        .setColor(config.embedcolor)
        .setTimestamp()
        .setDescription(`**${config.apply.qustion1}: ${qustion1Input}\n${config.apply.qustion2}: ${qustion2Input}\n${config.apply.qustion3}: ${qustion3Input}\n${config.apply.qustion4}: ${qustion4Input}\n${config.apply.qustion5}: ${qustion5Input}**`)
        .setFooter({text: interaction.member.id, iconURL: interaction.member.displayAvatarURL({dynamic: true})})
        const acceptButton = new discord.MessageButton()
        .setCustomId("accept")
        .setLabel("قبول")
        .setStyle("SUCCESS")
        const rejectButton = new discord.MessageButton()
        .setCustomId("reject")
        .setLabel("رفض")
        .setStyle("DANGER")
        const row = new discord.MessageActionRow()
        .addComponents(acceptButton, rejectButton)
        channel.send({embeds: [embed], components: [row]});
        await interaction.editReply({content: `تم ارسال التقديم الرجاء انتضار مراجعه التقديم`, ephemeral: true});
    }
};