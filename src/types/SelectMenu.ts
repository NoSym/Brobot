import { Awaitable, MessageSelectMenu, SelectMenuInteraction } from "discord.js"
import { CustomClient } from "../classes/CustomClient"

export type SelectMenu = {
    name: string,
    getMenu(client?: CustomClient): MessageSelectMenu,
    handleSelection(interaction: SelectMenuInteraction): Awaitable<void>
}