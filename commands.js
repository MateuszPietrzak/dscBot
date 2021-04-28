const ping = require("./commands/ping");
const db = require("./commands/db");

const commands = { ping, db };

module.exports = async function(msg){
  if(msg.channel.id == 836875926339452969){
    let tokens = msg.content.split(" ");
    let command = tokens.shift();
    if(command.charAt(0) === '!'){
      command = command.substring(1);
      commands[command](msg,tokens);
    }
  }
}
