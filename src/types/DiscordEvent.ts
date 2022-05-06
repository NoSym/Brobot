import { Awaitable } from "discord.js"

export type DiscordEvent = {
    name: string,
    once: boolean,
    execute(...args: any[]): Awaitable<void>
}