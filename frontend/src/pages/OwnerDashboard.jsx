import { useEffect, useState } from 'react';

import API from '../api/axios';

const OwnerDashboard = () => {

  const [stores, setStores] = useState([]);

  useEffect(() => {

    fetchStores();

  }, []);

  const fetchStores = async () => {

    try {

      const res = await API.get('/owner/dashboard');

      setStores(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className='p-6'>

      <h1 className='text-3xl font-bold mb-6'>
        Store Owner Dashboard
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

        {
          stores.map((store) => (

            <div
              key={store.id}
              className='bg-white p-6 rounded shadow'
            >

              <h2 className='text-2xl font-bold'>
                {store.name}
              </h2>

              <p className='text-gray-600'>
                {store.address}
              </p>

              <p className='mt-4 font-bold'>
                Average Rating:
                {store.averageRating || 0}
              </p>

              <div className='mt-4'>

                <h3 className='font-bold mb-2'>
                  User Ratings
                </h3>

                {
                  store.Ratings?.map((rating) => (

                    <div
                      key={rating.id}
                      className='border-b py-2'
                    >

                      <p>
                        User ID:
                        {rating.user_id}
                      </p>

                      <p>
                        Rating:
                        {rating.rating}
                      </p>

                    </div>

                  ))
                }

              </div>

            </div>

          ))
        }

      </div>

    </div>
  );
};

export default OwnerDashboard;