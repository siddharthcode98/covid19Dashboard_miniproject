import "./index.css";

const StateDetails = (props) => {
  const { details } = props;
  const { name, confirmed, deceased, recovered, population, active } = details;
  return (
    <div className="stateItem">
      <div className="textContainer1">
        <p className="paragraph2">{name}</p>
      </div>
      <div className="textContainer2">
        <p className="paragraph confirmed">{confirmed}</p>
      </div>
      <div className="textContainer2">
        <p className="paragraph active">{active}</p>
      </div>
      <div className="textContainer2">
        <p className="paragraph recovered">{recovered}</p>
      </div>
      <div className="textContainer2">
        <p className="paragraph deceased"> {deceased}</p>
      </div>
      <div className="textContainer2">
        <p className="paragraph3 population">{population}</p>
      </div>
    </div>
  );
};

export default StateDetails;
