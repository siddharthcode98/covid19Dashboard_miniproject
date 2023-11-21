import { Component } from "react";

import Loader from "react-loader-spinner";

import BarGraph from "../BarGraph";

import "./index.css";

const statesList = [
  {
    state_code: "AN",
    state_name: "Andaman and Nicobar Islands",
  },
  {
    state_code: "AP",
    state_name: "Andhra Pradesh",
  },
  {
    state_code: "AR",
    state_name: "Arunachal Pradesh",
  },
  {
    state_code: "AS",
    state_name: "Assam",
  },
  {
    state_code: "BR",
    state_name: "Bihar",
  },
  {
    state_code: "CH",
    state_name: "Chandigarh",
  },
  {
    state_code: "CT",
    state_name: "Chhattisgarh",
  },
  {
    state_code: "DN",
    state_name: "Dadra and Nagar Haveli and Daman and Diu",
  },
  {
    state_code: "DL",
    state_name: "Delhi",
  },
  {
    state_code: "GA",
    state_name: "Goa",
  },
  {
    state_code: "GJ",
    state_name: "Gujarat",
  },
  {
    state_code: "HR",
    state_name: "Haryana",
  },
  {
    state_code: "HP",
    state_name: "Himachal Pradesh",
  },
  {
    state_code: "JK",
    state_name: "Jammu and Kashmir",
  },
  {
    state_code: "JH",
    state_name: "Jharkhand",
  },
  {
    state_code: "KA",
    state_name: "Karnataka",
  },
  {
    state_code: "KL",
    state_name: "Kerala",
  },
  {
    state_code: "LA",
    state_name: "Ladakh",
  },
  {
    state_code: "LD",
    state_name: "Lakshadweep",
  },
  {
    state_code: "MH",
    state_name: "Maharashtra",
  },
  {
    state_code: "MP",
    state_name: "Madhya Pradesh",
  },
  {
    state_code: "MN",
    state_name: "Manipur",
  },
  {
    state_code: "ML",
    state_name: "Meghalaya",
  },
  {
    state_code: "MZ",
    state_name: "Mizoram",
  },
  {
    state_code: "NL",
    state_name: "Nagaland",
  },
  {
    state_code: "OR",
    state_name: "Odisha",
  },
  {
    state_code: "PY",
    state_name: "Puducherry",
  },
  {
    state_code: "PB",
    state_name: "Punjab",
  },
  {
    state_code: "RJ",
    state_name: "Rajasthan",
  },
  {
    state_code: "SK",
    state_name: "Sikkim",
  },
  {
    state_code: "TN",
    state_name: "Tamil Nadu",
  },
  {
    state_code: "TG",
    state_name: "Telangana",
  },
  {
    state_code: "TR",
    state_name: "Tripura",
  },
  {
    state_code: "UP",
    state_name: "Uttar Pradesh",
  },
  {
    state_code: "UT",
    state_name: "Uttarakhand",
  },
  {
    state_code: "WB",
    state_name: "West Bengal",
  },
];
const apiStatusConstants = {
  initial: "INITIAL",
  failure: "FAILURE",
  success: "SUCCESS",
  inProgress: "INPROGRESS",
};
class StateSpecificContainer extends Component {
  state = {
    stateName: "",
    tested: 0,
    confirmed: 0,
    recovered: 0,
    deceased: 0,
    active: 0,
    topDistricts: [],
    apiStatus: apiStatusConstants.initial,
    activeBtn: "confirmed",
  };

  componentDidMount() {
    this.getStateSpecificDetails();
  }
  getTopDistricts = (districts) => {
    const { activeBtn } = this.state;
    const listOfDistrict = [];
    const districtNames = Object.keys(districts);
    districtNames.forEach((dist) => {
      const { total } = districts[dist];
      if (activeBtn !== "active") {
        const count = total[activeBtn];
        listOfDistrict.push({
          value: count !== undefined ? count : 0,
          dist,
        });
      } else {
        const { confirmed, deceased, recovered } = total;
        const count = confirmed - (deceased + recovered);
        console.log(count);
        listOfDistrict.push({
          value: isNaN(count) ? 0 : count,
          dist,
        });
      }
    });
    const sortedList = listOfDistrict.sort((a, b) => b.value - a.value);
    return sortedList;
  };
  getStateSpecificDetails = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const StateDetailsApi = `https://apis.ccbp.in/covid19-state-wise-data`;
    const response = await fetch(StateDetailsApi);

    // console.log(data[stateCode]);
    // console.log(stateName);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const { match } = this.props;
      const { params } = match;
      const { stateCode } = params;
      const stateName = statesList.find((item) => item.state_code === stateCode)
        .state_name;
      const { total, districts } = data[stateCode];
      const { confirmed, recovered, deceased, tested } = total;
      const active = confirmed - (deceased + recovered);
      const TopDistricts = this.getTopDistricts(districts);
      this.setState({
        stateName,
        tested,
        confirmed,
        recovered,
        deceased,
        active,
        topDistricts: TopDistricts,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };
  onClickValue = (event) => {
    this.setState(
      { activeBtn: event.target.value },
      this.getStateSpecificDetails
    );
  };
  showLoadingView = () => (
    <div testid="stateDetailsLoader" className="loader-container">
      <Loader type="Oval" color="#007BFF" height="50" width="50" />
    </div>
  );

  showFailureView = () => (
    <>
      <img
        src="https://res.cloudinary.com/dvnzycytg/image/upload/v1697782182/Group_7484_vqvaql.png"
        alt="failure view"
        className="failure-Image"
      />
      <h1 className="failure-Heading ">PAGE NOT FOUND</h1>
      <p className="failure-paragraph">
        We are sorry, the page you requested for could not found please go back
        to the home page{" "}
      </p>
      <button className="failure-button">Home</button>
    </>
  );
  showSuccessView = () => {
    const {
      stateName,
      tested,
      confirmed,
      recovered,
      active,
      deceased,
      topDistricts,
      activeBtn,
    } = this.state;
    // console.log(stateName);
    // console.log(stateObj);
    let topDistHeadingColor;
    switch (activeBtn) {
      case "confirmed":
        topDistHeadingColor = "colorFill1";
        break;
      case "recovered":
        topDistHeadingColor = "colorFill3";
        break;
      case "deceased":
        topDistHeadingColor = "colorFill4";
        break;
      case "active":
        topDistHeadingColor = "colorFill2";
        break;
      default:
        break;
    }
    return (
      <>
        <div className="specific-state-section-1">
          <div className="stateSpecificTextContainer">
            <div className="state-name-container">
              <h1 className="state-name">{stateName}</h1>
              <p className="last-update">last updated on march 28th 2021</p>
            </div>

            <div className="state-name-container">
              <p className="tested">Tested</p>
              <p className="testedCases">{tested}</p>
            </div>
          </div>
        </div>
        <div className="specific-state-section-2">
          <div className="stateActiveCases">
            <div testid="stateSpecificConfirmedCasesContainer">
              <button
                className={`statusCardState ${
                  activeBtn === "confirmed" && "bgColor1"
                }`}
                onClick={this.onClickValue}
                value="confirmed"
              >
                <p className="colorFill1 paragraphState">Confirmed</p>
                <img
                  src="https://res.cloudinary.com/dvnzycytg/image/upload/v1697641834/check-mark_1_z7ps7v.png"
                  alt="state specific confirmed cases pic"
                />
                <p className="colorFill1 countState">{confirmed}</p>
              </button>
            </div>
            <div testid="stateSpecificActiveCasesContainer">
              <button
                className={`statusCardState  ${
                  activeBtn === "active" && "bgColor2"
                }`}
                value="active"
                onClick={this.onClickValue}
              >
                <p className="colorFill2 paragraphState">Active</p>
                <img
                  src="https://res.cloudinary.com/dvnzycytg/image/upload/v1697641834/protection_1_z1xf8r.png"
                  alt="state specific active cases pic"
                />
                <p className="colorFill2 countState">{active}</p>
              </button>
            </div>
            <div testid="stateSpecificRecoveredCasesContainer">
              <button
                className={`statusCardState  ${
                  activeBtn === "recovered" && "bgColor3"
                }`}
                value="recovered"
                onClick={this.onClickValue}
              >
                <p className="colorFill3 paragraphState">Recovered</p>
                <img
                  src="https://res.cloudinary.com/dvnzycytg/image/upload/v1697641834/recovered_1_hzk1js.png"
                  alt="state specific recovered cases pic"
                />
                <p className="colorFill3 countState">{recovered}</p>
              </button>
            </div>
            <div testid="stateSpecificDeceasedCasesContainer">
              <button
                className={`statusCardState  ${
                  activeBtn === "deceased" && "bgColor4"
                }`}
                value="deceased"
                onClick={this.onClickValue}
              >
                <p className="colorFill4 paragraphState">Deceased</p>
                <img
                  src="https://res.cloudinary.com/dvnzycytg/image/upload/v1697641834/breathing_1_ppkwhx.png"
                  alt="state specific deceased cases pic"
                />
                <p className="colorFill4 countState">{deceased}</p>
              </button>
            </div>
          </div>
        </div>
        <div className="specific-state-section-3">
          <div className="topDistContainer">
            <h1 className={` topDist ${topDistHeadingColor}`}>Top Districts</h1>
            <ul
              testid="topDistrictsUnorderedList"
              className="topDistrictsContainer"
            >
              {topDistricts.map((district) => (
                <li key={district.dist} className="listItem">
                  <p>
                    <span className="casesSpan ">{district.value}</span>
                    {district.dist}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="specific-state-section-4">
          <BarGraph activeBtn={activeBtn} />
        </div>
      </>
    );
  };
  showViews = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.showLoadingView();
      case apiStatusConstants.success:
        return this.showSuccessView();
      case apiStatusConstants.failure:
        return this.showFailureView();
      default:
        return null;
    }
  };
  render() {
    return <>{this.showViews()}</>;
  }
}

export default StateSpecificContainer;
