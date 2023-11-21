import DashboardContext from "../../context/DashboardContext";
import { Link } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import "./index.css";
const MobileDropdownValue = () => {
  return (
    <DashboardContext.Consumer>
      {(value) => {
        const { dropdownValue, showDropdown } = value;
        const onClickClose = () => {
          showDropdown();
        };
        return (
          <div className="mobileView-droplist">
            {dropdownValue && (
              <ul className="linkContainer2">
                <li>
                  <Link to="/" className="text">
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/about" className="text">
                    About
                  </Link>
                </li>

                <li className="closeBtnContainer">
                  <button
                    type="button"
                    className="closeBtn"
                    onClick={onClickClose}
                  >
                    <AiFillCloseCircle className="close" />
                  </button>
                </li>
              </ul>
            )}
          </div>
        );
      }}
    </DashboardContext.Consumer>
  );
};

export default MobileDropdownValue;
