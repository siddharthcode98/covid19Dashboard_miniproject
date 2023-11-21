import { VscGithubAlt } from "react-icons/vsc";

import { FiInstagram } from "react-icons/fi";

import { FaTwitter } from "react-icons/fa";

import "./index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="imageContainer">
        <img
          src="https://res.cloudinary.com/dvnzycytg/image/upload/v1697641834/COVID19INDIA_nfvstv.png"
          alt="website logo"
          className="footerLogo"
        />
      </div>
      <div className="textContainer">
        <p className="footer-text">
          We stand with everyone fighting on front line
        </p>
      </div>
      <div className="iconContainer">
        <VscGithubAlt className="githubIcon" />
        <FiInstagram className="instaIcon" />
        <FaTwitter className="twitterIcon" />
      </div>
    </footer>
  );
};

export default Footer;
