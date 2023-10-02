import { useParams } from 'react-router-dom';

const Carpage = () => {
  const { id } = useParams();
  const carID = typeof id === 'string' ? id : '';

  return (
    <div>
      <h1>Hello from Carpage</h1>
      <p>This is a basic carpage component for carID: {carID}.</p>
    </div>
  );
};

export default Carpage;
