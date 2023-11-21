import { Component } from "react";

import { withRouter } from "react-router-dom";

import Loader from "react-loader-spinner";

import "./index.css";

import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from "recharts";

const apiStatusConstants = {
  initial: "INITIAL",
  failure: "FAILURE",
  success: "SUCCESS",
  inProgress: "INPROGRESS",
};

class BarGraph extends Component {
  state = {
    datesList: [],
    TenDaysList: [],
    dates: {},
    apiStatus: apiStatusConstants.initial,
  };

  componentDidMount() {
    this.getGraphsData();
  }

  getGraphsData = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const { match } = this.props;

    const { params } = match;
    const { stateCode } = params;
    const graphsApiUrl = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`;
    const response = await fetch(graphsApiUrl);
    if (response.ok) {
      const data = await response.json();
      const { dates } = data[stateCode];
      this.setState({ apiStatus: apiStatusConstants.success, dates });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };
  getBarGraph = () => {
    const { dates } = this.state;
    const { activeBtn } = this.props;
    const listOfDates = Object.keys(dates);
    const TenDaysList = listOfDates.slice(0, 10);
    const listOfLastTenDates = [];
    TenDaysList.forEach((date) => {
      const { total } = dates[date];
      if (activeBtn !== "active") {
        const count = total[activeBtn];
        listOfLastTenDates.push({
          date,
          value: count !== undefined ? count : 0,
        });
      } else {
        const { confirmed, deceased, recovered } = total;
        const active = confirmed + (deceased - recovered);
        listOfLastTenDates.push({
          date,
          value: isNaN(active) ? 0 : active,
        });
      }
    });
    let colorName;
    switch (activeBtn) {
      case "confirmed":
        colorName = "#9A0E31";
        break;
      case "recovered":
        colorName = "#216837";
        break;
      case "active":
        colorName = "#0A4FA0";
        break;
      case "deceased":
        colorName = "#474C57";
        break;
      default:
        break;
    }
    // const DataFormatter = (number) => {
    //   if (number > 100000) {
    //     return `${(number / 100000).toString()}L`;
    //   } else if (number > 1000 && number < 100000) {
    //     return `${(number / 1000).toString()}K`;
    //   }
    //   return number.toString();
    // };
    return (
      <>
        <div className="barchart-container">
          <BarChart
            width={704}
            height={431}
            data={listOfLastTenDates.sort((a, b) => b.value - b.value)}
          >
            <YAxis tickCount={5} interval={"preserveStartEnd"} hide={true} />
            <XAxis
              dataKey="date"
              className="bar"
              axisLine={false}
              tick={{ fill: colorName, fontFamily: "Roboto" }}
            />
            <Bar
              dataKey="value"
              fill={colorName}
              barSize={60}
              label={{ position: "top", fill: colorName, fontFamily: "Roboto" }}
            />
          </BarChart>
        </div>
        <div className="barchart-container-mobile">
          <BarChart
            width={256}
            height={130}
            data={listOfLastTenDates.sort((a, b) => b.value - b.value)}
          >
            <YAxis tickCount={5} interval={"preserveStartEnd"} hide={true} />
            <XAxis
              dataKey="date"
              className="bar"
              axisLine={false}
              tick={{ fill: colorName, fontFamily: "Roboto", fontSize: "10px" }}
            />
            <Bar
              dataKey="value"
              fill={colorName}
              barSize={60}
              label={{
                position: "top",
                fill: colorName,
                fontFamily: "Roboto",
                fontSize: "8px",
              }}
            />
          </BarChart>
        </div>
      </>
    );
  };
  getConfirmedLineChart = () => {
    const { dates } = this.state;
    const listOfDates = Object.keys(dates);
    const listOfLastTenDates = [];
    listOfDates.forEach((date) => {
      const { total } = dates[date];
      const { confirmed } = total;
      listOfLastTenDates.push({
        date,
        confirmed,
      });
    });
    const DataFormatter = (number) => {
      if (number > 100000) {
        return `${(number / 100000).toString()}L`;
      } else if (number > 1000 && number < 100000) {
        return `${(number / 1000).toString()}K`;
      }
      return number.toString();
    };
    return (
      <>
        <div className="line-chart-container">
          <LineChart
            width={1018}
            height={238}
            data={listOfLastTenDates}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            className="line-chart-confirmed"
          >
            <XAxis
              dataKey="date"
              stroke="#9A0E31"
              className="x-line"
              width={"3"}
              tick={{ stroke: "#FF073A", strokeWidth: 2 }}
              axisLine={{ stroke: "#FF073A", strokeWidth: 2 }}
            />
            <YAxis
              tickFormatter={DataFormatter}
              tick={{ stroke: "#FF073A", strokeWidth: 2 }}
              axisLine={{ stroke: "#FF073A", strokeWidth: 2 }}
            />
            <Tooltip />
            <Legend
              verticalAlign="top"
              height={50}
              align="right"
              wrapperStyle={{ fontFamily: "Roboto" }}
            />
            <Line
              type="monotone"
              dataKey="confirmed"
              stroke="#FF073A"
              dot={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                fill: "#FF073A",
              }}
              strokeWidth={3}
            />
          </LineChart>
        </div>
        <div className="line-chart-container-mobile">
          <LineChart
            width={256}
            height={150}
            data={listOfLastTenDates}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            className="line-chart-confirmed"
          >
            <XAxis
              dataKey="date"
              stroke="#9A0E31"
              className="x-line"
              width={"2"}
              tick={{ stroke: "#FF073A", strokeWidth: 1, fontSize: "7px" }}
              axisLine={{ stroke: "#FF073A", strokeWidth: 1 }}
            />
            <YAxis
              tickFormatter={DataFormatter}
              tick={{ stroke: "#FF073A", strokeWidth: 1, fontSize: "7px" }}
              axisLine={{ stroke: "#FF073A", strokeWidth: 1 }}
            />
            <Tooltip />
            <Legend
              verticalAlign="top"
              height={50}
              align="right"
              wrapperStyle={{ fontFamily: "Roboto", fontSize: "7px" }}
            />
            <Line
              type="monotone"
              dataKey="confirmed"
              stroke="#FF073A"
              dot={{
                width: "1",
                height: "1",
                borderRadius: "1",
                fill: "#FF073A",
              }}
              strokeWidth={1}
            />
          </LineChart>
        </div>
      </>
    );
  };
  getRecoveredLineChart = () => {
    const { dates } = this.state;
    const listOfDates = Object.keys(dates);
    const listOfLastTenDates = [];
    listOfDates.forEach((date) => {
      const { total } = dates[date];
      const { recovered } = total;
      listOfLastTenDates.push({
        date,
        recovered,
      });
    });
    const DataFormatter = (number) => {
      if (number > 100000) {
        return `${(number / 100000).toString()}L`;
      } else if (number > 1000 && number < 100000) {
        return `${(number / 1000).toString()}K`;
      }
      return number.toString();
    };
    return (
      <>
        <div className="line-chart-recovered-container">
          <LineChart
            width={1018}
            height={238}
            data={listOfLastTenDates}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            className="line-chart-confirmed "
          >
            <XAxis
              dataKey="date"
              stroke="#27A243"
              className="x-line"
              width={"3"}
              tick={{ stroke: "#27A243", strokeWidth: 2 }}
              axisLine={{ stroke: "#27A243", strokeWidth: 2 }}
            />
            <YAxis
              tickFormatter={DataFormatter}
              tick={{ stroke: "#27A243", strokeWidth: 2 }}
              axisLine={{ stroke: "#27A243", strokeWidth: 2 }}
            />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontFamily: "Roboto" }}
            />
            <Line
              type="monotone"
              dataKey="recovered"
              stroke="#27A243"
              dot={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                fill: "#27A243",
              }}
              strokeWidth={3}
            />
          </LineChart>
        </div>
        <div className="line-chart-recovered-container-mobile">
          <LineChart
            width={256}
            height={150}
            data={listOfLastTenDates}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            className="line-chart-confirmed "
          >
            <XAxis
              dataKey="date"
              stroke="#27A243"
              className="x-line"
              width={"3"}
              tick={{ stroke: "#27A243", strokeWidth: 2 }}
              axisLine={{ stroke: "#27A243", strokeWidth: 2 }}
            />
            <YAxis
              tickFormatter={DataFormatter}
              tick={{ stroke: "#27A243", strokeWidth: 2 }}
              axisLine={{ stroke: "#27A243", strokeWidth: 2 }}
            />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontFamily: "Roboto" }}
            />
            <Line
              type="monotone"
              dataKey="recovered"
              stroke="#27A243"
              dot={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                fill: "#27A243",
              }}
              strokeWidth={3}
            />
          </LineChart>
        </div>
      </>
    );
  };
  getDeceasedLineChart = () => {
    const { dates } = this.state;
    const listOfDates = Object.keys(dates);
    const listOfLastTenDates = [];
    listOfDates.forEach((date) => {
      const { total } = dates[date];
      const { deceased } = total;
      listOfLastTenDates.push({
        date,
        deceased,
      });
    });
    const DataFormatter = (number) => {
      if (number > 100000) {
        return `${(number / 100000).toString()}L`;
      } else if (number > 1000 && number < 100000) {
        return `${(number / 1000).toString()}K`;
      }
      return number.toString();
    };
    return (
      <>
        <div className="line-chart-deceased-container">
          <LineChart
            width={1018}
            height={238}
            data={listOfLastTenDates}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            className="line-chart-confirmed "
          >
            <XAxis
              dataKey="date"
              stroke="#6C757D"
              className="x-line"
              width={"3"}
              tick={{ stroke: "#6C757D", strokeWidth: 2 }}
              axisLine={{ stroke: "#6C757D", strokeWidth: 2 }}
            />
            <YAxis
              tickFormatter={DataFormatter}
              tick={{ stroke: "#6C757D", strokeWidth: 2 }}
              axisLine={{ stroke: "#6C757D", strokeWidth: 2 }}
            />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontFamily: "Roboto" }}
            />
            <Line
              type="monotone"
              dataKey="deceased"
              stroke="#6C757D"
              dot={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                fill: "#6C757D",
              }}
              strokeWidth={3}
            />
          </LineChart>
        </div>
        <div className="line-chart-deceased-container-mobile">
          <LineChart
            width={256}
            height={150}
            data={listOfLastTenDates}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            className="line-chart-confirmed "
          >
            <XAxis
              dataKey="date"
              stroke="#6C757D"
              className="x-line"
              width={"3"}
              tick={{ stroke: "#6C757D", strokeWidth: 2 }}
              axisLine={{ stroke: "#6C757D", strokeWidth: 2 }}
            />
            <YAxis
              tickFormatter={DataFormatter}
              tick={{ stroke: "#6C757D", strokeWidth: 2 }}
              axisLine={{ stroke: "#6C757D", strokeWidth: 2 }}
            />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontFamily: "Roboto" }}
            />
            <Line
              type="monotone"
              dataKey="deceased"
              stroke="#6C757D"
              dot={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                fill: "#6C757D",
              }}
              strokeWidth={3}
            />
          </LineChart>
        </div>
      </>
    );
  };
  getTestedLineChart = () => {
    const { dates } = this.state;
    const listOfDates = Object.keys(dates);
    const listOfLastTenDates = [];
    listOfDates.forEach((date) => {
      const { total } = dates[date];
      const { tested } = total;
      listOfLastTenDates.push({
        date,
        tested,
      });
    });
    const DataFormatter = (number) => {
      if (number > 100000) {
        return `${(number / 100000).toString()}L`;
      } else if (number > 1000 && number < 100000) {
        return `${(number / 1000).toString()}K`;
      }
      return number.toString();
    };
    return (
      <>
        <div className="line-chart-Tested-container">
          <LineChart
            width={1018}
            height={238}
            data={listOfLastTenDates}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            className="line-chart-confirmed "
          >
            <XAxis
              dataKey="date"
              stroke="#9673B9"
              className="x-line"
              width={"3"}
              tick={{ stroke: "#9673B9", strokeWidth: 2 }}
              axisLine={{ stroke: "#9673B9", strokeWidth: 2 }}
            />
            <YAxis
              tickFormatter={DataFormatter}
              tick={{ stroke: "#9673B9", strokeWidth: 2 }}
              axisLine={{ stroke: "#9673B9", strokeWidth: 2 }}
            />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontFamily: "Roboto" }}
            />
            <Line
              type="monotone"
              dataKey="tested"
              stroke="#9673B9"
              dot={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                fill: "#9673B9",
              }}
              strokeWidth={3}
            />
          </LineChart>
        </div>
        <div className="line-chart-Tested-container-mobile">
          <LineChart
            width={256}
            height={150}
            data={listOfLastTenDates}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            className="line-chart-confirmed "
          >
            <XAxis
              dataKey="date"
              stroke="#9673B9"
              className="x-line"
              width={"3"}
              tick={{ stroke: "#9673B9", strokeWidth: 2 }}
              axisLine={{ stroke: "#9673B9", strokeWidth: 2 }}
            />
            <YAxis
              tickFormatter={DataFormatter}
              tick={{ stroke: "#9673B9", strokeWidth: 2 }}
              axisLine={{ stroke: "#9673B9", strokeWidth: 2 }}
            />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontFamily: "Roboto" }}
            />
            <Line
              type="monotone"
              dataKey="tested"
              stroke="#9673B9"
              dot={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                fill: "#9673B9",
              }}
              strokeWidth={3}
            />
          </LineChart>
        </div>
      </>
    );
  };
  getActiveLineChart = () => {
    const { dates } = this.state;
    const listOfDates = Object.keys(dates);
    const listOfLastTenDates = [];
    listOfDates.forEach((date) => {
      const { total } = dates[date];
      const { confirmed, deceased, recovered } = total;
      const active = confirmed - (deceased + recovered);
      listOfLastTenDates.push({
        date,
        active: isNaN(active) ? 0 : active,
      });
    });
    const DataFormatter = (number) => {
      if (number > 100000) {
        return `${(number / 100000).toString()}L`;
      } else if (number > 1000 && number < 100000) {
        return `${(number / 1000).toString()}K`;
      }
      return number.toString();
    };
    return (
      <>
        <div className="line-chart-active-container">
          <LineChart
            width={1018}
            height={238}
            data={listOfLastTenDates}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            className="line-chart-confirmed "
          >
            <XAxis
              dataKey="date"
              stroke="#007BFF"
              className="x-line"
              width={"3"}
              tick={{ stroke: "#007BFF", strokeWidth: 2 }}
              axisLine={{ stroke: "#007BFF", strokeWidth: 2 }}
            />
            <YAxis
              tickFormatter={DataFormatter}
              tick={{ stroke: "#007BFF", strokeWidth: 2 }}
              axisLine={{ stroke: "#007BFF", strokeWidth: 2 }}
            />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontFamily: "Roboto" }}
            />
            <Line
              type="monotone"
              dataKey="active"
              stroke="#007BFF"
              dot={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                fill: "#007BFF",
              }}
              strokeWidth={3}
            />
          </LineChart>
        </div>
        <div className="line-chart-active-container-mobile">
          <LineChart
            width={256}
            height={156}
            data={listOfLastTenDates}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            className="line-chart-confirmed "
          >
            <XAxis
              dataKey="date"
              stroke="#007BFF"
              className="x-line"
              width={"3"}
              tick={{ stroke: "#007BFF", strokeWidth: 2 }}
              axisLine={{ stroke: "#007BFF", strokeWidth: 2 }}
            />
            <YAxis
              tickFormatter={DataFormatter}
              tick={{ stroke: "#007BFF", strokeWidth: 2 }}
              axisLine={{ stroke: "#007BFF", strokeWidth: 2 }}
            />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontFamily: "Roboto" }}
            />
            <Line
              type="monotone"
              dataKey="active"
              stroke="#007BFF"
              dot={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                fill: "#007BFF",
              }}
              strokeWidth={3}
            />
          </LineChart>
        </div>
      </>
    );
  };

  showLoadingView = () => (
    <div testid="timelinesDataLoader" className="loader-container">
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

  showSuccessView = () => (
    <>
      {this.getBarGraph()}
      <h1 className="spread-trend-heading">Daily Spread Trends</h1>
      <div testid="lineChartsContainer" className="chartsContainer">
        {this.getConfirmedLineChart()}
        {this.getActiveLineChart()}
        {this.getRecoveredLineChart()}
        {this.getDeceasedLineChart()}
        {this.getTestedLineChart()}
      </div>
    </>
  );

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

export default withRouter(BarGraph);
