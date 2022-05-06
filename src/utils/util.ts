export const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const fetchAsync = async <T>(url: string): Promise<T> => {
    const response = await fetch(url)

    return await response.json()
}