import { FiStar } from 'react-icons/fi';

const StarRating = ({ rating, onRatingChange, readonly = false, size = 'text-xl' }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onRatingChange && onRatingChange(star)}
          disabled={readonly}
          className={`${size} ${
            star <= rating
              ? 'text-yellow-400'
              : 'text-gray-300'
          } ${!readonly && 'hover:text-yellow-400 cursor-pointer'} transition-colors`}
        >
          <FiStar className={star <= rating ? 'fill-current' : ''} />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
