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
          <>
            {dropdownValue && (
              <ul className="linkContainer2">
                <Link to="/">
                  <li className="text"> Home</li>
                </Link>
                <Link to="/about">
                  <li className="text">About</li>
                </Link>
                <li>
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
          </>
        );
      }}
    </DashboardContext.Consumer>
  );
};

export default MobileDropdownValue;
