// Require the necessary discord.js classes
import { Intents } from 'discord.js'
import { CustomClient } from './classes/CustomClient'
import 'dotenv/config'

// Create a new client instance
const client = new CustomClient({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN)