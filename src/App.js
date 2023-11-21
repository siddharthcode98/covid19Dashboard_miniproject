import { Component } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./components/Home";

import About from "./components/About";

import Header from "./components/Header";

import Footer from "./components/Footer";

import NotFound from "./components/NotFound";

import StateSpecificContainer from "./components/StateSpecificContainer";

import MobileDropdown from "./components/MobileDropdown";

import DashboardContext from "./context/DashboardContext";

import "./App.css";

class App extends Component {
  state = { dropdownValue: false };
  showDropdown = () => {
    this.setState((prevState) => ({ dropdownValue: !prevState.dropdownValue }));
  };
  render() {
    const { dropdownValue } = this.state;
    console.log(dropdownValue);
    return (
      <DashboardContext.Provider
        value={{ dropdownValue, showDropdown: this.showDropdown }}
      >
        <div className="AppContainer">
          <Header />
          <MobileDropdown />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/state/:stateCode"
              component={StateSpecificContainer}
            />
            <Route component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
          <Footer />
        </div>
      </DashboardContext.Provider>
    );
  }
}

export default App;
