import { fetchAsync } from "../utils/util"

const URL_WIKI = 'https://en.wikipedia.org/w/api.php?'

type Page = {
    extract: string
}

type WikiQuery = {
    pages: Array<Page>
}

type WikiResponse = {
    query: WikiQuery
}

export const wikiSearch = async (term: string): Promise<string> => {
    const queryParams = new URLSearchParams({
        action: 'query',
        generator: 'search',
        gsrsearch: term,
        gsrnamespace: '0',
        gsrlimit: '1',
        prop: 'extracts',
        explaintext: 'true',
        exsentences: '2',
        format: 'json'
    })

    const response = await fetchAsync<WikiResponse>(URL_WIKI + queryParams)
    const keyString = Object.keys(response.query.pages)[0]
    const key = parseInt(keyString)
    const page = response.query.pages[key]

    return page?.extract ?? 'idk'
}