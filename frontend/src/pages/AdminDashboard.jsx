import {
  useEffect,
  useState
} from 'react';

import API from '../api/axios';

import DashboardCard from '../components/DashboardCard';

import { toast } from 'react-toastify';

const AdminDashboard = () => {

  const [stats, setStats] = useState({});

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState('');

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'USER'
  });

  const [storeForm, setStoreForm] = useState({
  name: '',
  email: '',
  address: '',
  owner_id: ''
});

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const statsRes = await API.get(
        '/admin/dashboard'
      );

      setStats(statsRes.data);

      const usersRes = await API.get(
        '/admin/users'
      );

      setUsers(usersRes.data);

    } catch (error) {

      toast.error('Error loading dashboard');
    }
  };

  
 const addUser = async () => {

  // VALIDATION

  if (
    !userForm.name ||
    !userForm.email ||
    !userForm.password ||
    !userForm.address
  ) {

    toast.error('All fields required');

    return;
  }

  try {

    await API.post(
      '/admin/users',
      userForm
    );

    toast.success('User added');

    fetchDashboard();

    setUserForm({
      name: '',
      email: '',
      password: '',
      address: '',
      role: 'USER'
    });

  } catch (error) {

    toast.error('Error adding user');
  }
};

  const filteredUsers = users.filter((user) =>
    user.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort(
    (a, b) =>
      a.name.localeCompare(b.name)
  );

  const addStore = async () => {

  // VALIDATION

  if (
    !storeForm.name ||
    !storeForm.email ||
    !storeForm.address ||
    !storeForm.owner_id
  ) {

    toast.error('All fields required');

    return;
  }

  try {

    await API.post(
      '/admin/stores',
      storeForm
    );

    toast.success('Store added');

    setStoreForm({
      name: '',
      email: '',
      address: '',
      owner_id: ''
    });

    fetchDashboard();

  } catch (error) {

    toast.error('Error adding store');
  }
};

  return (

    <div className='p-6'>

      {/* Dashboard Cards */}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

        <DashboardCard
          title='Users'
          value={stats.totalUsers || 0}
        />

        <DashboardCard
          title='Stores'
          value={stats.totalStores || 0}
        />

        <DashboardCard
          title='Ratings'
          value={stats.totalRatings || 0}
        />

      </div>

      {/* Add User Form */}

      <div className='bg-white p-6 rounded shadow mt-8'>

        <h2 className='text-2xl font-bold mb-4'>
          Add User
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

          <input
            type='text'
            placeholder='Name'
            value={userForm.name}
            className='border p-2 rounded'
            onChange={(e) =>
              setUserForm({
                ...userForm,
                name: e.target.value
              })
            }
          />

          <input
            type='email'
            placeholder='Email'
            value={userForm.email}
            className='border p-2 rounded'
            onChange={(e) =>
              setUserForm({
                ...userForm,
                email: e.target.value
              })
            }
          />

          <input
            type='password'
            placeholder='Password'
            value={userForm.password}
            className='border p-2 rounded'
            onChange={(e) =>
              setUserForm({
                ...userForm,
                password: e.target.value
              })
            }
          />

          <input
            type='text'
            placeholder='Address'
            value={userForm.address}
            className='border p-2 rounded'
            onChange={(e) =>
              setUserForm({
                ...userForm,
                address: e.target.value
              })
            }
          />

          <select
            value={userForm.role}
            className='border p-2 rounded'
            onChange={(e) =>
              setUserForm({
                ...userForm,
                role: e.target.value
              })
            }
          >

            <option value='USER'>
              USER
            </option>

            <option value='STORE_OWNER'>
              STORE OWNER
            </option>

            <option value='ADMIN'>
              ADMIN
            </option>

          </select>

        </div>

        <button
          onClick={addUser}
          className='bg-green-600 text-white px-6 py-2 rounded mt-4 hover:bg-green-700'
        >
          Add User
        </button>

      </div>

      <div className='bg-white p-6 rounded shadow mt-8'>

  <h2 className='text-2xl font-bold mb-4'>
    Add Store
  </h2>

  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

    <input
      type='text'
      placeholder='Store Name'
      value={storeForm.name}
      className='border p-2 rounded'
      onChange={(e) =>
        setStoreForm({
          ...storeForm,
          name: e.target.value
        })
      }
    />

    <input
      type='email'
      placeholder='Store Email'
      value={storeForm.email}
      className='border p-2 rounded'
      onChange={(e) =>
        setStoreForm({
          ...storeForm,
          email: e.target.value
        })
      }
    />

    <input
      type='text'
      placeholder='Store Address'
      value={storeForm.address}
      className='border p-2 rounded'
      onChange={(e) =>
        setStoreForm({
          ...storeForm,
          address: e.target.value
        })
      }
    />

    <input
      type='number'
      placeholder='Owner ID'
      value={storeForm.owner_id}
      className='border p-2 rounded'
      onChange={(e) =>
        setStoreForm({
          ...storeForm,
          owner_id: e.target.value
        })
      }
    />

  </div>

  <button
    onClick={addStore}
    className='bg-blue-600 text-white px-6 py-2 rounded mt-4 hover:bg-blue-700'
  >
    Add Store
  </button>

</div>
      {/* Search */}

      <div className='bg-white p-6 rounded shadow mt-8'>

        <div className='flex justify-between items-center mb-4'>

          <h2 className='text-2xl font-bold'>
            Users
          </h2>

          <input
            type='text'
            placeholder='Search users...'
            value={search}
            className='border p-2 rounded'
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* Users Table */}

        <div className='overflow-x-auto'>

          <table className='w-full border'>

            <thead>

              <tr className='bg-gray-200'>

                <th className='p-3 border'>
                  Name
                </th>

                <th className='p-3 border'>
                  Email
                </th>

                <th className='p-3 border'>
                  Address
                </th>

                <th className='p-3 border'>
                  Role
                </th>

              </tr>

            </thead>

            <tbody>

              {
                sortedUsers.map((user) => (

                  <tr
                    key={user.id}
                    className='text-center'
                  >

                    <td className='p-3 border'>
                      {user.name}
                    </td>

                    <td className='p-3 border'>
                      {user.email}
                    </td>

                    <td className='p-3 border'>
                      {user.address}
                    </td>

                    <td className='p-3 border'>
                      {user.role}
                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;