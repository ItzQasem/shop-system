const fs = require('fs');

module.exports = (client) => {
fs.readdirSync('./commands').forEach((folder) => {
    const CommandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of CommandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        if (command.name){
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }
});
}