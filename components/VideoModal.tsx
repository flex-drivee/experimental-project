import React, { useEffect } from 'react';
import { Video } from '../types';
import { CloseIcon, PlayIcon } from './icons';

interface VideoModalProps {
  video: Video;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={video.thumbnailUrl} alt={video.title} className="w-full aspect-video object-cover rounded-t-lg" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 rounded-full p-1.5 hover:bg-black/80 transition"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
          <div className="absolute bottom-10 left-10">
            <h2 className="text-4xl font-bold mb-4">{video.title}</h2>
            <button className="flex items-center justify-center bg-white text-black font-semibold rounded-md px-6 py-2 hover:bg-neutral-300 transition">
                <PlayIcon className="w-6 h-6 mr-2" />
                Play
            </button>
          </div>
        </div>
        <div className="p-10">
          <div className="flex space-x-8">
            <div className="flex-grow">
              <div className="flex items-center space-x-4 mb-4 text-sm">
                {/* FIX: Property 'rating' does not exist on type 'Video'. Replaced with 'match'. */}
                <span className="text-green-500 font-semibold">{video.match}</span>
                <span>{video.duration}</span>
              </div>
              <p className="text-base">{video.synopsis}</p>
            </div>
            <div className="flex-shrink-0 w-1/3 text-sm space-y-2">
                <p><span className="text-neutral-500">Genres: </span>{video.genre.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
