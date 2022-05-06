import { Awaitable, ButtonInteraction, MessageButton } from "discord.js"

export type Button = {
    name: string,
    button: MessageButton,
    handleClick(interaction: ButtonInteraction): Awaitable<void>
}