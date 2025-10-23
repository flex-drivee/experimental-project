import React, { useRef } from 'react';
import { Category } from '../types';
import VideoCard from './VideoCard';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';
import type { Video } from '../types';


interface VideoCarouselProps {
  category: Category;
  onCardClick: (video: Video) => void;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ category, onCardClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8
        : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative group"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-4">{category.title}</h2>
      
      <div className="relative">
         <div 
            ref={scrollRef}
            className="flex overflow-x-auto space-x-2 md:space-x-4 scrollbar-hide"
            style={{ scrollPadding: '0 5%' }}
        >
            {category.videos.map((video, index) => (
            <VideoCard
                key={video.id}
                video={video}
                onCardClick={onCardClick}
                isFirst={index === 0}
                isLast={index === category.videos.length - 1}
            />
            ))}
        </div>

        <button
          onClick={() => scroll('left')}
          className={`absolute top-0 bottom-0 left-0 w-12 bg-black/50 text-white z-20 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:cursor-default`}
        >
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
        <button
          onClick={() => scroll('right')}
          className={`absolute top-0 bottom-0 right-0 w-12 bg-black/50 text-white z-20 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:cursor-default`}
        >
          <ChevronRightIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;