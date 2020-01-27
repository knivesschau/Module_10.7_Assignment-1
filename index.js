'use strict';

const parkSearch = "https://developer.nps.gov/api/v1/parks";
const apiKey = "HDRoriqkk0gQTncHBeCliOEDhVZd2H3OJO8bUcuY";

function submitState() {
    console.log("submitState ran!");
    $("#state-selector").on("submit", function(event) {
        event.preventDefault();
        const stateInput = $("#state-entry").val();
        const limit = $("#park-number").val();
        obtainParkData(stateInput, limit);
    });
}

function convertQuery(parameters) {
    console.log("convertQuery ran!");
    const parkData = Object.keys(parameters).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`);
    return parkData.join("&");
}

function obtainParkData(query, limit=10) {
    console.log("obtainParkData ran!");
    const parameters = {
        api_key: apiKey,
        q: query,
        limit: limit,
    };

    const searchString = convertQuery(parameters);
    const searchQuery = parkSearch + "?" + searchString; 
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
    console.log("showParks ran!");
    console.log(responseJson);
    $("#parks-list").empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $("#parks-list").append(`
        <li><h3>${responseJson.data[i].fullName}</h3>
        <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
        <p>${responseJson.data[i].description}</p>
        <p>${responseJson.data[i].directionsInfo}</p>
        </li>`)
    }
    $("#parks").removeClass("hidden");
}

$(submitState);