import { FaStar } from 'react-icons/fa';

const RatingStars = ({
  rating,
  setRating
}) => {

  return (
    <div className='flex gap-2'>

      {
        [1,2,3,4,5].map((star) => (

          <FaStar
            key={star}
            size={25}
            className={
              star <= rating
              ? 'text-yellow-500 cursor-pointer'
              : 'text-gray-300 cursor-pointer'
            }
            onClick={() => setRating(star)}
          />

        ))
      }

    </div>
  );
};

export default RatingStars;