import { MessageHandler } from "../types/MessageHandler"
import { wikiSearch } from "../services/wikiService";
import { Message } from "discord.js";
const pirateSpeak = require('pirate-speak');

const REGEX_WIKI = /^(what(((s|'s|\sis)\s(a\s|an\s)?)|\sare\s))/gi

const parse = (content: string): string => {
    const match = content.match(REGEX_WIKI)

    if (!match) return ''

    return content.substring(match[0].length)
}

const handle = async (message: Message) => {
    const predicate = parse(message.content)

    if (!predicate) return

    const wikiInfo = await wikiSearch(predicate)

    message.reply(pirateSpeak.translate(wikiInfo))
}

const wikiMessage: MessageHandler = {
    handle
}

export default wikiMessage