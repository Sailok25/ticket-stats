const { REST, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// ⚠️ Reemplaza estos valores por los tuyos:
const CLIENT_ID = '1371238378183327754';
const GUILD_ID = '1073160046197870612';

(async () => {
  try {
    console.log('🔁 Registrando comandos slash...');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log('✅ ¡Comandos registrados con éxito!');
  } catch (error) {
    console.error(error);
  }
})();
