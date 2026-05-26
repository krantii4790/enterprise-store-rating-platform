import {
  useEffect,
  useState
} from 'react';

import API from '../api/axios';

const StoreOwnerDashboard = () => {

  const [data, setData] = useState(null);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

  const res = await API.get('/owner');

  setData(res.data);
};

  if (!data) return <p>Loading...</p>;

  return (
    <div className='p-6'>

      <div className='bg-white p-6 rounded shadow'>

        <h2 className='text-2xl font-bold'>
          {data.store.name}
        </h2>

        <p className='mt-2'>
          Average Rating:
          {data.averageRating}
        </p>

      </div>

      <div className='bg-white mt-6 p-6 rounded shadow'>

        <h2 className='text-xl font-bold mb-4'>
          Ratings
        </h2>

        {
          data.ratings.map((item) => (

            <div
              key={item.id}
              className='border-b py-2'
            >
              Rating:
              {item.rating}
            </div>

          ))
        }

      </div>

    </div>
  );
};

export default StoreOwnerDashboard;