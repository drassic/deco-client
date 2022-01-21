export interface Course {
    name: string,
    description: string,
    topics?: Topic[],
    sections?: Section[]
}

export interface Topic {
    name: string,
    sections: Section[]
}

export interface Section {
    type: 'md' | 'video'
}

export interface VideoSection extends Section {
    type: 'video',
    provider: 'lbry',
    url: string
}

export interface MarkdownSection extends Section {
    type: 'md',
    content: string
}

