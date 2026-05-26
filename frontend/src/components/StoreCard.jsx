import { useState } from 'react';

import API from '../api/axios';

import { toast } from 'react-toastify';

const StoreCard = ({ store }) => {

  const [rating, setRating] = useState(0);

  const submitRating = async () => {

    if (rating < 1 || rating > 5) {

      toast.error('Select rating 1 to 5');

      return;
    }

    try {

      await API.post('/ratings', {
        store_id: store.id,
        rating
      });

      toast.success('Rating submitted');

    } catch (error) {

      toast.error('Error submitting rating');
    }
  };

  return (

    <div className='bg-white p-6 rounded shadow'>

      <h2 className='text-2xl font-bold'>
        {store.name}
      </h2>

      <p>{store.address}</p>

      <p className='font-bold mt-2'>
        Average Rating:
        {store.averageRating || 0}
      </p>

      <div className='flex gap-2 mt-4 text-3xl cursor-pointer'>

        {
          [1, 2, 3, 4, 5].map((star) => (

            <span
              key={star}
              onClick={() => setRating(star)}
            >
              {
                rating >= star
                  ? '⭐'
                  : '☆'
              }
            </span>

          ))
        }

      </div>

      <button
        onClick={submitRating}
        className='bg-blue-600 text-white px-4 py-2 rounded mt-4'
      >
        Submit Rating
      </button>

    </div>
  );
};

export default StoreCard;