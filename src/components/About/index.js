import { Component } from "react";

import AboutItem from "../AboutItem";

import Loader from "react-loader-spinner";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  failure: "FAILURE",
  success: "SUCCESS",
  inProgress: "INPROGRESS",
};

class About extends Component {
  state = { aboutList: [], apiStatus: apiStatusConstants.initial };
  componentDidMount() {
    this.getAboutData();
  }
  getAboutData = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const aboutApiUrl = "https://apis.ccbp.in/covid19-faqs";
    const response = await fetch(aboutApiUrl);
    if (response.ok) {
      const data = await response.json();
      const { faq } = data;
      this.setState({ aboutList: faq, apiStatus: apiStatusConstants.success });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };
  showLoadingView = () => (
    <div className="aboutRouteLoader" data-testid="loader">
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
    const { aboutList } = this.state;
    return (
      <div className="about-text-container">
        <h1 className="about">About </h1>
        <p className="last-update-about">Last update on march 28th 2021.</p>
        <p className="ready-for-distribution">
          COVID-19 vaccines be ready for distribution
        </p>
        <ul testid="faqsUnorderedList" className="listOfQns">
          {aboutList.map((item) => (
            <AboutItem key={item.qno} Qns={item} />
          ))}
        </ul>
      </div>
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

export default About;
