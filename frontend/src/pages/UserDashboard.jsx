import {
  useEffect,
  useState
} from 'react';

import API from '../api/axios';

import StoreCard from '../components/StoreCard';

import SearchBar from '../components/SearchBar';

const UserDashboard = () => {

  const [stores, setStores] = useState([]);

  const [search, setSearch] = useState('');

  useEffect(() => {

    fetchStores();

  }, []);

  const fetchStores = async () => {

    const res = await API.get('/user/stores');

    setStores(res.data);
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(
      search.toLowerCase()
    )
  );

  return (
    <div className='p-6'>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>

        {
          filteredStores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
            />
          ))
        }

      </div>

    </div>
  );
};

export default UserDashboard;