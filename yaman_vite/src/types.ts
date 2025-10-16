export interface Artwork {
    id: number;
    title: string;
    place_of_origin: string;
    artist_display: string;
    inscriptions: string | null;
    date_start: number;
    date_end: number;
}

export interface Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
}

export interface ArtworkResponse {
    data: Artwork[];
    pagination: Pagination;
}
