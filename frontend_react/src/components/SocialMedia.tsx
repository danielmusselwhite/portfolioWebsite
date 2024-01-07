import { BsGithub, BsLinkedin } from 'react-icons/bs';

const SocialMedia = () => {
  return (
    <div className="social-media">
      <div>
        <a href={"https://github.com/danielmusselwhite/"} target="_blank" rel="noopener noreferrer">
          <BsGithub />
        </a>
      </div>
      <div>
        <a href={"https://www.linkedin.com/in/daniel-musselwhite/"} target="_blank" rel="noopener noreferrer">
          <BsLinkedin />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
