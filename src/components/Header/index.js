import { Link, withRouter } from "react-router-dom";

import { MdOutlinePlaylistAdd } from "react-icons/md";

import DashboardContext from "../../context/DashboardContext";

import "./index.css";

const Header = (props) => {
  const { location } = props;
  const { pathname } = location;
  const homeActive = pathname === "/" ? "linkItem" : "InactiveLinkItem";
  const AboutActive = pathname === "/about" ? "linkItem" : "InactiveLinkItem";

  return (
    <DashboardContext.Consumer>
      {(value) => {
        const { showDropdown } = value;
        const onClickChange = () => {
          showDropdown();
        };
        return (
          <header className="NavBarContainer">
            <nav className="navContainer">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dvnzycytg/image/upload/v1697641834/COVID19INDIA_nfvstv.png"
                  alt="website logo"
                  className="websiteLogo"
                />
              </Link>
              <button
                type="button"
                className="dropdown"
                onClick={onClickChange}
              >
                <MdOutlinePlaylistAdd className="small-size-dropdown" />
              </button>

              <ul className="linkContainer">
                <Link to="/">
                  <li className={homeActive}>Home</li>
                </Link>
                <Link to="/about">
                  <li className={AboutActive}>About</li>
                </Link>
              </ul>
            </nav>
          </header>
        );
      }}
    </DashboardContext.Consumer>
  );
};

export default withRouter(Header);
