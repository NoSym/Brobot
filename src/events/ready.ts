import { Client } from "discord.js";
import { DiscordEvent } from "../types/DiscordEvent";

const ready: DiscordEvent = {
    name: 'ready',
    once: true,
    execute (client: Client) {
        console.log(`Logged in as ${client.user?.tag}`)
    }
}

export default ready