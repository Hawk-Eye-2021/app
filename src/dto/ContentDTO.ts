export interface ContentDTO {
    id: string
    title: string
    url: string
    sourceId: string
    createdAt: string
}

export interface ThemeContent extends ContentDTO{
    sentiment: string
}

export interface ContentDetails extends ContentDTO {
    sentiments: {themeId: string, sentiment: string}[]
}