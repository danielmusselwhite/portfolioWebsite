import { BsGithub, BsLinkedin } from 'react-icons/bs';

const SocialMedia = () => {
  return (
    <div className="app__social">
      <div>
        <a href={"https://github.com/danielmusselwhite/"} target="_blank" rel="noopener noreferrer">
          <BsGithub style={{ color: "black" }}/>
        </a>
      </div>
      <div>
        <a href={"https://www.linkedin.com/in/daniel-musselwhite/"} target="_blank" rel="noopener noreferrer">
          <BsLinkedin style={{ color: "blue" }}/>
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
