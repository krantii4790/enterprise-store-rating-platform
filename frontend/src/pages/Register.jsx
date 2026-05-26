import { useState } from 'react';

import API from '../api/axios';

import { toast } from 'react-toastify';

const Register = () => {

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  });

  const handleSubmit = async (e) => {

  e.preventDefault();

  if (
    !form.name ||
    !form.email ||
    !form.password ||
    !form.address
  ) {

    toast.error('All fields are required');

    return;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(form.email)) {

    toast.error('Invalid email');

    return;
  }

  if (form.password.length < 6) {

    toast.error(
      'Password must be at least 6 characters'
    );

    return;
  }

  try {

    await API.post(
      '/auth/register',
      form
    );

    toast.success(
      'Registered successfully'
    );

    window.location.href = '/login';

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      'Registration failed'
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
          Register
        </h2>

        <input
          placeholder='Name'
          className='w-full border p-2 mb-4'
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        <input
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

        <textarea
          placeholder='Address'
          className='w-full border p-2 mb-4'
          onChange={(e) =>
            setForm({
              ...form,
              address: e.target.value
            })
          }
        />

        <button
          className='bg-green-600 text-white w-full p-2 rounded'
        >
          Register
        </button>

      </form>

    </div>
  );
};

export default Register;