import { Category, Video } from './types';

const generateVideos = (count: number, category: string): Video[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: category.charCodeAt(0) * 100 + i,
    title: `${category} Title ${i + 1}`,
    thumbnailUrl: `https://picsum.photos/seed/${category}${i}/400/225`,
    duration: i % 3 === 0 ? `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 59)}m` : `${Math.floor(Math.random() * 60) + 20}m`,
    genre: ['Action', 'Adventure', 'Sci-Fi', 'Drama', 'Comedy'].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1),
    synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    isNew: Math.random() > 0.7,
    match: `${Math.floor(Math.random() * 20) + 80}% Match`,
    maturityRating: ['U/A 7+', 'U/A 13+', 'U/A 16+', 'A'][Math.floor(Math.random() * 4)],
    seasons: Math.random() > 0.5 ? `${Math.floor(Math.random() * 5) + 1} Season${Math.random() > 0.5 ? 's' : ''}` : undefined,
    isHD: Math.random() > 0.5,
  }));
};

export const FEATURED_VIDEO: Video = {
    id: 999,
    title: 'Featured Blockbuster',
    thumbnailUrl: 'https://picsum.photos/seed/featured/1280/720',
    duration: '1h 55m',
    genre: ['Sci-Fi', 'Action'],
    synopsis: 'In a dystopian future, a lone hero rises to challenge a corrupt regime, armed with nothing but courage and a thirst for justice. A thrilling adventure that will keep you on the edge of your seat.',
    match: '98% Match',
    maturityRating: 'U/A 16+',
    seasons: '3 Seasons',
    isHD: true,
};

export const CATEGORIES: Category[] = [
  {
    title: 'Trending Now',
    videos: generateVideos(10, 'Trending'),
  },
  {
    title: 'Top Picks for You',
    videos: generateVideos(12, 'TopPicks'),
  },
  {
    title: 'New Releases',
    videos: generateVideos(8, 'NewReleases'),
  },
  {
    title: 'Sci-Fi Hits',
    videos: generateVideos(11, 'SciFi'),
  },
  {
    title: 'Critically Acclaimed Dramas',
    videos: generateVideos(9, 'Drama'),
  },
];
