export interface ContentDTO {
    id: string
    title: string
    url: string
    sourceId: string
    sentiments: ContentSentiments[];
}

export interface ContentSentiments {
    themeId: string;
    sentiment: Sentiment
}

export type Sentiment = 'positive' | "negative" | "neutral";