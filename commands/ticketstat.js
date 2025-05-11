const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticketstat')
    .setDescription('Indica si los tickets están activos o desactivados')
    .addStringOption(option =>
      option.setName('estado')
        .setDescription('Escribe "activos" o "desactivados"')
        .setRequired(true)
        .addChoices(
          { name: 'Activos', value: 'activos' },
          { name: 'Desactivados', value: 'desactivados' }
        )
    ),
  async execute(interaction) {
    const estado = interaction.options.getString('estado');
    let embed;

    if (estado === 'activos') {
      embed = new EmbedBuilder()
        .setTitle('🎟️ Sistema de Tickets')
        .setDescription('✅ Los tickets están **nuevamente habilitados**.')
        .setColor(0x00FF00);
    } else if (estado === 'desactivados') {
      embed = new EmbedBuilder()
        .setTitle('🎟️ Sistema de Tickets')
        .setDescription('🚫 Los tickets han sido **inhabilitados temporalmente**.')
        .setColor(0xFF0000);
    }

    await interaction.reply({ embeds: [embed] });
  }
};
