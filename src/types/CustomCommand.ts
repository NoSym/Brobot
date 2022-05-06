import { Awaitable, CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export type CustomCommand = {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    enabled: boolean
    execute(interaction: CommandInteraction): Awaitable<void>
}