import reactImage from '../../assets/images/react.jpg';
import Clock from '../../components/Clock/Clock';
import './Home.css';

const Home = () => {
  return (
    <div className='global-container'>
      <Clock />
      <h1>Home Page</h1>
      <img src={reactImage} className="react-image" alt="React img" />
      <p>Welcome to the home page!</p>
    </div>
  );
}

export default Home;
