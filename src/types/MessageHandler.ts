import { Awaitable, Message } from "discord.js"

export type MessageHandler = {
    handle(message: Message): Awaitable<void>
}