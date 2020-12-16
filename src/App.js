import "./App.css";
import SearchBar from "./components/searchBar/index.js";
import Map from "./components/map/index.js";
import Cities from "./components/cities/index.js";
import { Component } from "react";
import escapeRegexp from "escape-string-regexp";
class App extends Component {
  state = {
    querry: "",
    searchBar: "",
    locations: [
      {
        title: "Lekki Conservation Centre",
        location: { lat: 6.4415182, lng: 3.535771 },
      },
      {
        title: "Elegushi",
        location: { lat: 6.431500199999999, lng: 3.4818982 },
      },
      {
        title: "The Rock Drive",
        location: { lat: 6.4392268, lng: 3.4714524 },
      },
      {
        title: "Bukka Hut",
        location: { lat: 6.447577099999999, lng: 3.4752471 },
      },
      {
        title: "Bay Lounge",
        location: { lat: 27.4682205, lng: -82.57517229999999 },
      },
    ],
  };
  updateQuerry = (query) => {
    this.setState({ querry: query });
  };
  componentDidMount() {
    let searchBarInput = document.querySelector(".searchBox");
    this.setState({ searchBar: searchBarInput });
  }
  render() {
    let { querry, searchBar, locations } = this.state;
    let queriedContacts;
    if (querry) {
      const match = new RegExp(escapeRegexp(querry), "i");
      queriedContacts = locations.filter((city) => {
        return match.test(city.title);
      });
    } else {
      queriedContacts = locations;
    }
    return (
      <div className="App">
        {console.log(this.state.cityVal)}
        <div className="container">
          <div className="heading">
            {" "}
            <h1>My Neighbourhood Map</h1>
          </div>
          <div className="searchBar">
            <SearchBar querry={querry} updateQuerry={this.updateQuerry} />
          </div>
          <div className="map">
            <Map
              searchBarInput={searchBar}
              citiesInfo={locations}
              queriedContacts={queriedContacts}
              querry={querry}
            />
          </div>
          <div className="cities">
            <Cities
              queriedContacts={queriedContacts}
              cityValues={this.cityValues}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
