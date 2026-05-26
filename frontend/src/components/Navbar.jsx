import { Link } from 'react-router-dom';

const Navbar = () => {

  const role = localStorage.getItem('role');

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className='bg-blue-600 text-white p-4 flex justify-between'>

      <h1 className='text-xl font-bold'>
        Store Rating Platform
      </h1>

      <div className='space-x-4'>

        <Link to='/'>
          Home
        </Link>

        {
          role === 'ADMIN' &&
          <Link to='/admin'>
            Admin
          </Link>
        }

        {
          role === 'USER' &&
          <Link to='/user'>
            User
          </Link>
        }

        {
          role === 'STORE_OWNER' &&
          <Link to='/owner'>
            Owner
          </Link>
        }

        <button onClick={logout}>
          Logout
        </button>

      </div>

    </div>
  );
};

export default Navbar;