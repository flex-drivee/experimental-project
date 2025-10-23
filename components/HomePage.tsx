import React, { useState } from 'react';
import { CATEGORIES, FEATURED_VIDEO } from '../constants';
import { Video } from '../types';
import VideoCarousel from './VideoCarousel';
import VideoModal from './VideoModal';
import { PlayIcon } from './icons';

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleCardClick = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="relative pb-16">
      {/* Hero Section */}
      <div className="relative h-[56.25vw] mb-8">
        <img src={FEATURED_VIDEO.thumbnailUrl} alt={FEATURED_VIDEO.title} className="absolute top-0 left-0 w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-[20%] left-4 md:left-16 text-white max-w-md">
          <h1 className="text-3xl md:text-5xl font-bold">{FEATURED_VIDEO.title}</h1>
          <p className="mt-4 text-sm md:text-base line-clamp-3">{FEATURED_VIDEO.synopsis}</p>
          <div className="flex items-center mt-6 space-x-3">
            <button className="flex items-center justify-center bg-white text-black font-semibold rounded-md px-6 py-2 hover:bg-neutral-300 transition">
              <PlayIcon className="w-6 h-6 mr-2" />
              Play
            </button>
            <button 
              onClick={() => handleCardClick(FEATURED_VIDEO)}
              className="flex items-center justify-center bg-gray-500/70 text-white font-semibold rounded-md px-6 py-2 hover:bg-gray-600/70 transition">
              More Info
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Carousels */}
      <div className="flex flex-col space-y-4 md:space-y-8 lg:space-y-12 px-4 md:px-16">
        {CATEGORIES.map((category) => (
          <VideoCarousel
            key={category.title}
            category={category}
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedVideo && (
        <VideoModal video={selectedVideo} onClose={closeModal} />
      )}
    </div>
  );
};

export default HomePage;
