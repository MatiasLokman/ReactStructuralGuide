import reactLogo from '../../assets/svgs/react.svg';
import Clock from '../../components/Clock/Clock';
import './About.css';

const About = () => {
  return (
    <div className='global-container'>
      <Clock />
      <h1>About Page</h1>
      <img src={reactLogo} className="About-logo" alt="React logo" />
      <p>Welcome to the about page!</p>
    </div>
  );
}

export default About;
