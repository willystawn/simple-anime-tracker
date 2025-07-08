
export interface Anime {
    id: string;
    created_at: string;
    title: string;
    image_url: string | null;
    total_episodes: number;
    watched_episodes: number[];
}

export enum FilterOption {
    All = 'All',
    Watching = 'Watching',
    Completed = 'Completed',
    PlanToWatch = 'Plan to Watch'
}

export enum SortOption {
    TitleAZ = 'Title (A-Z)',
    TitleZA = 'Title (Z-A)',
    Progress = 'Progress'
}

export interface Recommendation {
    title: string;
    reason: string;
}