import { DMChannel, Message } from "discord.js";
import { CustomClient } from "../classes/CustomClient";
import { DiscordEvent } from "../types/DiscordEvent";

const messageCreate: DiscordEvent = {
    name: 'messageCreate',
    once: false,
    async execute (message: Message) {
        if (message.channel instanceof DMChannel || message.channel?.partial) return

        const client = message.client as CustomClient

        if (message.author == client.user) return

        try {
            for (const handler of client.messageHandlers) {
                await handler.handle(message)
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export default messageCreate