export interface TocItem {
    id: string
    text: string
    level: number
}

export function generateId(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s぀-ゟ゠-ヿ一-龯]/g, '')
        .replace(/\s+/g, '-')
        .trim()
}

export function extractHeadings(html: string): TocItem[] {
    const headingRegex = /<(h[23])[^>]*>(.*?)<\/h[23]>/gi
    const headings: TocItem[] = []
    let match

    while ((match = headingRegex.exec(html)) !== null) {
        const level = parseInt(match[1][1])
        const text = match[2].replace(/<[^>]+>/g, '').trim()
        headings.push({
            id: generateId(text),
            text,
            level,
        })
    }

    return headings
}

export function addHeadingIds(html: string): string {
    return html.replace(/<(h[23])([^>]*)>(.*?)<\/h[23]>/gi, (_, tag, attrs, inner) => {
        const text = inner.replace(/<[^>]+>/g, '').trim()
        const id = generateId(text)
        return `<${tag}${attrs} id="${id}">${inner}</${tag}>`
    })
}
