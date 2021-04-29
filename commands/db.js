const Sequelize = require('sequelize');
const Discord = require('discord.js');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

module.exports = async function(msg,tokens){
    if (tokens[0] === 'add') {
			const tagName = tokens[1];

      tokens.shift();
      tokens.shift();

      console.log(tokens);
			const tagDescription = tokens.join(" ");

			try {
				// equivalent to: INSERT INTO tags (name, descrption, username) values (?, ?, ?);
				const tag = await Tags.create({
					name: tagName,
					description: tagDescription,
					username: msg.author.username,
				});
				return msg.reply(`${tag.name} was added.`);
			} catch (e) {
				if (e.name === 'SequelizeUniqueConstraintError') {
					return msg.send('That tag already exists.');
				}
				return msg.send('Something went wrong with adding a tag.');
			}
		}  else if (tokens[0] === 'remove') {
      const tagName = tokens[1];
			const rowCount = await Tags.destroy({ where: { name: tagName } });
			if (!rowCount) return msg.send('That tag did not exist.');

			return msg.reply('Tag deleted.');
		} else if(tokens[0] === 'list'){
      const names = await Tags.findAll({ attributes: ['name','description','username'] });
      //const desc = await Tags.findAll({ attributes: ['description'] });
      //console.log(names);
      const listEmbed = new Discord.MessageEmbed().setTitle("List");
			listEmbed.setColor('#0099ff');
			listEmbed.setThumbnail(msg.author.displayAvatarURL());
      for(let i = 0; i<names.length; i++){
        if(names[i].username === msg.author.username){
          listEmbed.addField(names[i].name,names[i].description);
        }
      }

      //const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
      return msg.channel.send(listEmbed);
    } else if(tokens[0] === 'listAll'){
      const names = await Tags.findAll({ attributes: ['name','description','username'] });
      //const desc = await Tags.findAll({ attributes: ['description'] });
      //console.log(names);
      const listEmbed = new Discord.MessageEmbed().setTitle("List");
			listEmbed.setColor('#ff9900');
      for(let i = 0; i<names.length; i++){
				let a = names[i].name;
				a += " ( ";
				a += names[i].username;
				a += " )"
        listEmbed.addField(a,names[i].description);
      }

      //const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
      return msg.channel.send(listEmbed);
    }
}
