import React, { Component } from "react";
import "../searchBar/searchBar.css";

class SearchBar extends Component {
  render() {
    let { querry, updateQuerry } = this.props;
    return (
      <div>
        <div className="box">
          <div className="searchHeader">
            {" "}
            <b>Locations in Lekki</b>
          </div>
          <input
            type="text"
            className="searchBox"
            onChange={(event) => {
              updateQuerry(event.target.value);
            }}
            value={querry}
          />
        </div>
      </div>
    );
  }
}
export default SearchBar;
