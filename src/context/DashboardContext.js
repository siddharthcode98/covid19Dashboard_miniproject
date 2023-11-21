import React from "react";

const DashboardContext = React.createContext({
  dropdownValue: false,
  showDropdown: () => {},
});

export default DashboardContext;
