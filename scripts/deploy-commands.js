const fs = require('node:fs')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const dotenv = require('dotenv')

const ENV_TEST = 'test'
const ENV_PROD = 'prod'

dotenv.config()

const commands = []
const commandFiles = fs.readdirSync(`${__dirname}/../src/commands`).filter((file) => file.endsWith('.ts'))
const environment = process.argv.length > 2 ? process.argv[2] : ENV_TEST

console.log('Registering commands...')

for (const file of commandFiles) {
    const command = require(`${__dirname}/../src/commands/${file}`).default
    
    if (command.enabled || environment === ENV_TEST) {
        console.log(file)
        commands.push(command.data.toJSON())
    }
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN)

if (environment === ENV_TEST) {
    rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.TEST_GUILD_ID), { body: commands })
    .then(() => console.log('Successfully registered guild application commands.'))
    .catch(console.error)
} else if (environment === ENV_PROD) {
    rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands })
    .then(() => console.log('Successfully registered global application commands.'))
    .catch(console.error)
}