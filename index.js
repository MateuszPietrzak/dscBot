const Discord = require('discord.js');


require('dotenv').config();

const client = new Discord.Client();
client.login(process.env.TOKEN);
client.on('ready', () => {
  console.log('logged in');
});

client.once('ready', () => {
  console.log('sync');
  Tags.sync();
});

const Sequelize = require('sequelize');

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

const commandHandler = require('./commands');

client.on('message',commandHandler);
