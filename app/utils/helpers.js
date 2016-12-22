// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

var config = require('../config/config.js');

// NY-Times API
var NYTAPI = config.NYTAPI;

// Helper functions for making API Calls
var helpers = {

    // Get NYT Articles
    runQuery: function(topic, startYear, endYear) {

        var queryTopic = topic;
        var queryStartYear = startYear;
        var queryEndYear = endYear;

        console.log(queryTopic, queryStartYear, queryEndYear);

        var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + NYTAPI + "&q=";
        var queryURL = queryURLBase + queryTopic;

        // if the user provides a start year, add it to the query
        if (parseInt(queryStartYear)) {
            queryURL += "&begin_date=" + queryStartYear + "0101";
        }
        // if the user provides an end year, add it to the query
        if (parseInt(queryEndYear)) {
            queryURL += "&end_date=" + queryEndYear + "0101";
        }

        return axios.get(queryURL).then(function(response) {
            // If there are results, pull out the relevant data and send to the user
            if (response.data.response.docs[0]) {
                return response.data.response.docs;
            }
            // If we don't get any results, return an empty string
            return "";
        });
    }
};

// We export the API helper
module.exports = helpers;
