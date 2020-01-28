'use strict';

const parkSearch = `https://developer.nps.gov/api/v1/parks`;
const apiKey = "HDRoriqkk0gQTncHBeCliOEDhVZd2H3OJO8bUcuY";

function submitState() {
    console.log("App loaded, ready for input.");
    $("#state-selector").on("submit", function(event) {
        event.preventDefault();
        const stateInput = $("#state-entry").val();
        const limit = $("#park-number").val();
        obtainParkData(stateInput, limit);
    });
}

function convertQuery(parameters) {
    const parkData = Object.keys(parameters).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`);
    return parkData.join("&");
}

function obtainParkData(query, limit=10) {
    const parameters = {
        api_key: apiKey,
        q: query,
        limit: limit,
        stateCode: query,
    };

    const searchString = convertQuery(parameters);
    const searchQuery = parkSearch + '?' + searchString; 
    console.log(searchQuery);

    fetch(searchQuery)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
            })
        .then(responseJson => showParks(responseJson))
        .catch(error => alert("An error occurred. Please try again later."));
}

function showParks(responseJson) {
    console.log(responseJson);
    $("#parks-list").empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $("#parks-list").append(`
        <li><h3>${responseJson.data[i].fullName}</h3>
        <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
        <p><span id="park-1">Park Info:</span>${responseJson.data[i].description}</p>
        <p><span id="park-2">Weather:</span>${responseJson.data[i].weatherInfo}</p>
        <p><span id="park-3">Directions:</span>${responseJson.data[i].directionsInfo}</p>
        </li>`)
    }
    $("#parks").removeClass("hidden");
}

$(submitState);