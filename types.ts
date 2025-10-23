export interface Video {
  id: number;
  title: string;
  thumbnailUrl: string;
  videoUrl?: string;
  duration: string;
  genre: string[];
  synopsis: string;
  isNew?: boolean;
  match: string; // e.g., '96% Match'
  maturityRating: string; // e.g., 'U/A 16+'
  seasons?: string; // e.g., '2 Seasons'
  isHD?: boolean;
}

export interface Category {
  title: string;
  videos: Video[];
}
