import { Component } from "react";
import Loader from "react-loader-spinner";

import StateDetails from "../StateDetails";

import AllIndiaResult from "../AllIndiaResult";

import SearchStateItem from "../SearchStateItem";

import { BsSearch } from "react-icons/bs";

import { FcGenericSortingAsc, FcGenericSortingDesc } from "react-icons/fc";

import DashboardContext from "../../context/DashboardContext";

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
// let option = [];
// statesList.forEach((item) => {
//   option.push({
//     value: item.state_code,
//     label: item.state_name,
//   });
// });

const apiStatusConstants = {
  initial: "INITIAL",
  failure: "FAILURE",
  success: "SUCCESS",
  inProgress: "INPROGRESS",
};

class Home extends Component {
  state = {
    stateWiseList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: "",
  };
  componentDidMount() {
    this.getResult();
  }
  getResult = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const stateWiseApiUrl = `https://apis.ccbp.in/covid19-state-wise-data`;
    const response = await fetch(stateWiseApiUrl);
    const data = await response.json();
    const stateNames = Object.keys(data);
    // console.log(stateNames);
    const resultList = [];
    if (response.ok) {
      stateNames.forEach((state) => {
        if (data[state]) {
          const { total } = data[state];
          const confirmed = total.confirmed ? total.confirmed : 0;
          const deceased = total.deceased ? total.deceased : 0;
          const recovered = total.recovered ? total.recovered : 0;
          const tested = total.tested ? total.tested : 0;
          const population = data[state].meta.population
            ? data[state].meta.population
            : 0;
          const stateName = statesList.find(
            (item) => item.state_code === state
          );
          //   console.log(typeof stateName);
          resultList.push({
            stateCode: state,
            name: stateName ? stateName.state_name : "no name",
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
          });
        }
      });
      //change api status here and update statewiseList
      this.setState({
        stateWiseList: resultList,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      //api status failure Here
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };
  onChangeSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  showLoadingView = () => (
    <div testid="homeRouteLoader" className="loader-container">
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
  onClickSortAsc = () => {
    console.log("hello");
    this.setState((prevState) => ({
      stateWiseList: prevState.stateWiseList.sort((a, b) =>
        b.name.localeCompare(a.name)
      ),
    }));
  };
  onClickSortDsc = () => {
    console.log("hello");
    this.setState((prevState) => ({
      stateWiseList: prevState.stateWiseList.sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    }));
  };
  showSuccessView = () => {
    const { stateWiseList, searchInput } = this.state;
    console.log(stateWiseList);
    const filteredData = stateWiseList.filter(
      (item) => item.name !== "no name"
    );

    const searchData = filteredData.filter((item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    // console.log(searchData);

    return (
      <DashboardContext.Consumer>
        {(value) => {
          const { dropdownValue } = value;
          return (
            <>
              {!dropdownValue && (
                <div className="searchSection">
                  <div className="searchBarContainer">
                    <BsSearch className="searchIcon" />
                    <input
                      type="search"
                      value={searchInput}
                      onChange={this.onChangeSearchInput}
                      placeholder="Enter the State"
                      className="searchBar"
                    />
                  </div>
                </div>
              )}

              {searchInput !== "" && (
                <ul
                  testid="searchResultsUnorderedList"
                  className="searchStateContainer"
                >
                  {searchData.map((item) => (
                    <SearchStateItem key={item.stateCode} details={item} />
                  ))}
                </ul>
              )}

              {searchInput === "" && (
                <div className="AllIndiaStatus">
                  <AllIndiaResult stateWiseData={filteredData} />
                </div>
              )}
              {searchInput === "" && (
                <div className="tableContainer">
                  <div
                    testid="stateWiseCovidDataTable"
                    className="stateWiseDataTable"
                  >
                    <div className="tableHeadings">
                      <p className="Heading1">
                        States/UT{" "}
                        <button
                          type="button"
                          testid="ascendingSort"
                          onClick={this.onClickSortAsc}
                          className="sortEle"
                        >
                          <FcGenericSortingAsc color={"white"} size={20} />
                        </button>
                        <button
                          type="button"
                          testid="descendingSort"
                          onClick={this.onClickSortDsc}
                          className="sortEle"
                        >
                          <FcGenericSortingDesc size={20} color={"white"} />
                        </button>
                      </p>

                      <p className="Heading2">Confirmed</p>
                      <p className="Heading3">Active</p>
                      <p className="Heading4">Recovered</p>
                      <p className="Heading5">Deceased</p>
                      <p className="Heading6">Population</p>
                    </div>
                    <div className="dataList">
                      {filteredData.map((item) => (
                        <StateDetails details={item} key={item.stateCode} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        }}
      </DashboardContext.Consumer>
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

export default Home;
