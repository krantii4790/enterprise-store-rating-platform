import {
  useState,
  useContext
} from 'react';

import API from '../api/axios';

import { toast } from 'react-toastify';

import { AuthContext } from '../context/AuthContext';

const Login = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {

  e.preventDefault();

  if (!form.email || !form.password) {

    toast.error('All fields are required');

    return;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(form.email)) {

    toast.error('Invalid email format');

    return;
  }

  try {

    const res = await API.post(
      '/auth/login',
      form
    );

    login(res.data);

    toast.success('Login successful');

    if (res.data.role === 'ADMIN') {
      window.location.href = '/admin';
    }

    if (res.data.role === 'USER') {
      window.location.href = '/user';
    }

    if (res.data.role === 'STORE_OWNER') {
      window.location.href = '/owner';
    }

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      'Login failed'
    );
  }
};

  return (
    <div className='flex justify-center items-center h-screen'>

      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded shadow w-96'
      >

        <h2 className='text-2xl font-bold mb-4'>
          Login
        </h2>

        <input
          type='email'
          placeholder='Email'
          className='w-full border p-2 mb-4'
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <input
          type='password'
          placeholder='Password'
          className='w-full border p-2 mb-4'
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        <button
          className='bg-blue-600 text-white w-full p-2 rounded'
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;