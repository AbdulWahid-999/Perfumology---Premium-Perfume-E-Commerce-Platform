import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ImageGallery = ({ images, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const allImages = images && images.length > 0 ? images : [];

  if (allImages.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl overflow-hidden">
        <img
          src={allImages[currentIndex]}
          alt={`${productName} - Image ${currentIndex + 1}`}
          className="w-full h-[500px] object-cover"
        />

        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {currentIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {allImages.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? 'border-primary-600 scale-110 shadow-lg'
                  : 'border-gray-300 hover:border-primary-400 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
