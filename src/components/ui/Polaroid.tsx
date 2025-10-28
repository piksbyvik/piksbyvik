import React from 'react';
import Image from 'next/image';

interface PolaroidProps {
  imageSrc: string;
  caption: string;
  alt?: string;
  rotation?: number;
  className?: string;
  imgclassName?: string;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  objectPosition?: string;
}

const Polaroid: React.FC<PolaroidProps> = ({
  imageSrc,
  caption,
  alt = 'Polaroid photo',
  rotation = 0,
  className = '',
  imgclassName = 'h-[300px]',
  style,
  imgStyle,
  objectPosition
}) => {
  return (
    <div      className={`relative bg-white shadow-md px-3 pt-3 border border-black ${className}`}
      style={{ 
        transform: `rotate(${rotation}deg)`,
        ...style
      }}
    >
      {/* Image section */}
      <div 
        className={`relative w-full overflow-hidden border border-black ${imgclassName}`}
        style={imgStyle}
      >        {
          imageSrc ? (
            <Image
              src={imageSrc}
              alt={alt}
              fill
              sizes="(max-width: 640px) 320px, (max-width: 768px) 400px, (max-width: 1024px) 450px, 500px"
              className={`w-full h-full object-cover ${!objectPosition ? 'md:object-center' : ''}`}
              style={objectPosition ? { objectPosition } : undefined}
            /> 
          ): (
            <div className='bg-black w-full h-full'>

            </div>
          )
        }
      </div>

      {/* Caption area with polaroid spacing */}
      <div className="px-3 py-4 text-center">
        <p className="font-la-belle-aurore text-[16px] md:text-[20px] text-gray-800 leading-snug">
          {caption} <span className="md:text-[20px] text-[18px]">♡</span>
        </p>
      </div>
    </div>
  );
};
export default Polaroid;

