import "./index.css";

const AllIndiaResult = (props) => {
  const { stateWiseData } = props;
  let confirmedCases = 0;
  let deceasedCases = 0;
  let activeCases = 0;
  let recoveredCases = 0;
  stateWiseData.forEach((item) => {
    confirmedCases += parseInt(item.confirmed);
    deceasedCases += parseInt(item.deceased);
    activeCases += parseInt(item.active);
    recoveredCases += parseInt(item.recovered);
  });

  return (
    <div className="IndiaStats">
      <div testid="countryWideConfirmedCases" className="statusCard ">
        <p className="colorFill1 paragraph">Confirmed</p>
        <img
          src="https://res.cloudinary.com/dvnzycytg/image/upload/v1697641834/check-mark_1_z7ps7v.png"
          alt="country wide confirmed cases pic"
          className="casesImage"
        />
        <p className="colorFill1 count">{confirmedCases}</p>
      </div>
      <div testid="countryWideActiveCases" className="statusCard">
        <p className="colorFill2 paragraph">Active</p>
        <img
          src="https://res.cloudinary.com/dvnzycytg/image/upload/v1697641834/protection_1_z1xf8r.png"
          alt="country wide active cases pic"
          className="casesImage"
        />
        <p className="colorFill2 count">{activeCases}</p>
      </div>
      <div testid="countryWideRecoveredCases" className="statusCard ">
        <p className="colorFill3 paragraph">Recovered</p>
        <img
          src="https://res.cloudinary.com/dvnzycytg/image/upload/v1697641834/recovered_1_hzk1js.png"
          alt="country wide recovered cases pic"
          className="casesImage"
        />
        <p className="colorFill3 count">{recoveredCases}</p>
      </div>
      <div testid="countryWideDeceasedCases" className="statusCard ">
        <p className="colorFill4 paragraph">Deceased</p>
        <img
          src="https://res.cloudinary.com/dvnzycytg/image/upload/v1697641834/breathing_1_ppkwhx.png"
          alt="country wide deceased cases pic"
          className="casesImage"
        />
        <p className="colorFill4 count">{deceasedCases}</p>
      </div>
    </div>
  );
};

export default AllIndiaResult;
