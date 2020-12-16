import React from "react";
import "../cities/cities.css";
function Cities({ queriedContacts, cityValues }) {
  return (
    <div>
      <div className="box">
        <ol>
          {queriedContacts.map((city) => {
            return <li>{city.title}</li>;
          })}
        </ol>
      </div>
    </div>
  );
}

export default Cities;
/**
 * Show queried Contacts from search bar realtime
 *
 * create a function that checks the value in search Bar against the values in the list
 *
 * use regexp to check value in searchbox against values in the array
 *
 * filter the array to display values matching the querry
 * querriedContacts(){
 *
 * }
 */
