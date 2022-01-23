export interface CourseI {
    name: string,
    topics?: TopicI[],
    sections?: SectionI[]
}

export interface TopicI {
    name: string,
    sections: SectionI[]
}

export interface SectionI {
    type: 'md' | 'video'
}

export interface VideoSectionI extends SectionI {
    type: 'video',
    provider?: 'lbry',
    url: string
}

export interface MarkdownSectionI extends SectionI {
    type: 'md',
    content: string
}
