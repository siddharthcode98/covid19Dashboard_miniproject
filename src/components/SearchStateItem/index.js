import { Link } from "react-router-dom";

import { BiChevronRightSquare } from "react-icons/bi";

import "./index.css";

const SearchStateItem = (props) => {
  const { details } = props;
  const { name, stateCode } = details;
  return (
    <Link to={`/state/${stateCode}`} style={{ textDecoration: "none" }}>
      <li className="stateName">
        {name}
        <button className="BtnStyle">
          {stateCode}
          <BiChevronRightSquare className="chevronIcon" />
        </button>
      </li>
    </Link>
  );
};

export default SearchStateItem;
