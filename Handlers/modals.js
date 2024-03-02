const fs = require('fs');
module.exports = (client) => {
        const modalFiles = fs.readdirSync('./interactions/modals').filter((file) => file.endsWith('.js'));
        for(const file of modalFiles){
             const modals = require(`../interactions/modals/${file}`);
        if (modals.name){
            client.modals.set(modals.name, modals);
        } else {
            continue;
        }
    }   
}