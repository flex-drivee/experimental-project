import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Video } from '../types';
import { PlayIcon, PlusIcon, ChevronDownIcon, ThumbsUpIcon } from './icons';

interface VideoCardProps {
  video: Video;
  onCardClick: (video: Video) => void;
  isFirst: boolean;
  isLast: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onCardClick, isFirst, isLast }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    
    showTimeoutRef.current = window.setTimeout(() => {
      if (placeholderRef.current) {
        setRect(placeholderRef.current.getBoundingClientRect());
        setIsHovered(true);
      }
    }, 250);
  };

  const handleMouseLeave = () => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
    }
    
    hideTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(false);
    }, 100);
  };

  const transformOriginClass = isFirst ? 'origin-left' : isLast ? 'origin-right' : 'origin-center';
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <>
      <div
        ref={placeholderRef}
        className="flex-shrink-0 w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 aspect-video"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onCardClick(video)}
      >
        <div className="relative w-full h-full cursor-pointer">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>

      {isHovered && rect && createPortal(
        <div
          style={{
            position: 'fixed',
            top: rect.top,
            left: rect.left,
            width: rect.width,
            zIndex: 50,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`
              bg-neutral-900 rounded-md shadow-2xl flex flex-col cursor-pointer
              transition-all duration-300 ease-in-out
              ${transformOriginClass}
              scale-150 -translate-y-[25%]
            `}
            onClick={() => onCardClick(video)}
          >
            <div className="relative w-full aspect-video">
                <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover rounded-t-md"
                />
            </div>
            
            <div className="p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                      <button onClick={stopPropagation} className="flex items-center justify-center w-8 h-8 bg-white rounded-full text-black hover:bg-neutral-300">
                          <PlayIcon className="w-5 h-5 ml-0.5"/>
                      </button>
                      <button onClick={stopPropagation} className="flex items-center justify-center w-8 h-8 border-2 border-neutral-400 rounded-full hover:border-white transition">
                          <PlusIcon className="w-5 h-5"/>
                      </button>
                      <button onClick={stopPropagation} className="flex items-center justify-center w-8 h-8 border-2 border-neutral-400 rounded-full hover:border-white transition">
                          <ThumbsUpIcon className="w-5 h-5"/>
                      </button>
                  </div>
                  <button onClick={() => onCardClick(video)} className="flex items-center justify-center w-8 h-8 border-2 border-neutral-400 rounded-full hover:border-white transition">
                      <ChevronDownIcon className="w-5 h-5"/>
                  </button>
              </div>
              
              {video.isNew && (
                <div className="flex items-center pt-2">
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">Recently Added</span>
                </div>
              )}

              <div className="flex items-center space-x-2 text-neutral-300 text-xs pt-1">
                  <span className="font-bold text-green-400">{video.match}</span>
                  <span className="border border-neutral-400 px-1 text-neutral-400 text-[10px] leading-tight">{video.maturityRating}</span>
                  {video.seasons && <span>{video.seasons}</span>}
                  {video.isHD && <span className="border border-neutral-400 px-1 text-neutral-400 text-[10px] leading-tight">HD</span>}
              </div>

              <div className="flex flex-wrap items-center text-xs text-neutral-200">
                  {video.genre.map((g, index) => (
                      <React.Fragment key={g}>
                          <span className="whitespace-nowrap">{g}</span>
                          {index < video.genre.length - 1 && <span className="mx-1.5 text-[8px]">&#9679;</span>}
                      </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default VideoCard;