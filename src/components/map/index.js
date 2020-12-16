import React, { Component } from "react";
import "../map/map.css";
let infowindow;
class Map extends Component {
  state = {
    content: `HELLO wORLD `,
  };

  queriedContacts = () => {
    if (window.google) {
      let { searchBarInput, queriedContacts } = this.props;
      const markers = createMarkers(queriedContacts);
      markers.map((marker) => {
        return this.addEventListAndMarker(
          marker,
          this.initMap(),
          this.state.content
        );
      });
      showMarkers(markers, this.initMap());
      autoComplete(searchBarInput);
    }
  };
  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBmkd745R2o_vEfc2nh9KWzQoOMdmtaaUY&libraries=places&v=3&callback=initMap"
    );
    window.initMap = this.initMap;
  };
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 6.458985, lng: 3.601521 },
      zoom: 12,
    });

    infowindow = new window.google.maps.InfoWindow();

    return map;
  };
  addEventListAndMarker = (marker, map, state) => {
    marker.addListener("click", () => {
      // this.fourSqReq(marker.title);
      this.fourSqReq(marker.title, infowindow);
      infowindow.open(map, marker);
    });
  };
  fourSqReq = (querry, infoWindow) => {
    let client_id = "MPHDPBWNLV1TZFR5MWJPMA23KRI2IEG4TI5LS0GAWFDDULHG",
      client_secret = "CRXGAHVUQ4ZLQEHHKPJFYTT10HMLCS2XEFYF3AIKCQJ0Y5IP",
      v = "20190425";
    let baseApiUrl = `https://api.foursquare.com/v2/venues/search?client_id=${client_id}&client_secret=${client_secret}&v=${v}&near=Lekki&intent=browse&radius=100000&query=${querry}&limit=10`;

    fetch(baseApiUrl)
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        console.log(resp);
        if (resp.response.venues[1]) {
          infoWindow.setContent(`<p> <b> Name </b>: ${resp.response.venues[1].name}</p> <br>

          <p> <b> Category </b>: ${resp.response.venues[1].categories[0].name}</p> <br>`);
        }
      });
  };

  componentDidMount() {
    this.renderMap();
    setTimeout(() => {
      this.queriedContacts();
    }, 3000);
    // this.fourSqReq("", infowindow);
  }

  componentDidUpdate() {
    this.queriedContacts();
  }

  render() {
    return <div id="map" className="box"></div>;
  }
}

function loadScript(url) {
  let index = window.document.querySelectorAll("script")[0];
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
/**
 * function to create markers based on positions in the location array
 */

function createMarkers(locations) {
  return locations.map((elem, index) => {
    return new window.google.maps.Marker({
      position: elem.location,
      title: elem.title,
      animation: window.google.maps.Animation.DROP,
      id: index,
    });
  });
}
/**
 * function to show markers on Map
 */
function showMarkers(markersArray, map) {
  return markersArray.map((elem) => {
    return elem.setMap(map);
  });
}

function autoComplete(input) {
  let autocomplete = new window.google.maps.places.Autocomplete(input);
  return autocomplete;
}

export default Map;
