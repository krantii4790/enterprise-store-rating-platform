const DashboardCard = ({
  title,
  value
}) => {

  return (
    <div className='bg-white p-6 rounded shadow'>

      <h2 className='text-lg font-bold'>
        {title}
      </h2>

      <p className='text-3xl mt-2'>
        {value}
      </p>

    </div>
  );
};

export default DashboardCard;