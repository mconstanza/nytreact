// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// NY-Times API
var NYTAPI = "5063f54818154873afa3996286e1b391";

// Helper functions for making API Calls
var helper = {

    // This function serves our purpose of running the query to geolocate.
    runQuery: function(topic, startYear, endYear) {

        var queryTopic = topic;
        var queryStartYear = startYear;
        var queryEndYear = endYear;

        console.log(queryTopic, queryStartYear, queryEndYear);

        // Get the articles from NYT

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

        console.log("Query: " + queryURL);

        return axios.get(queryURL).then(function(response) {
            // If there are results, pull out the relevant data and send to the user
            if (response.docs) {
                return response.docs;
            }
            // If we don't get any results, return an empty string
            return "";
        });
    },

    // This function hits our own server to retrieve the record of query results
    getSaved: function() {
        return axios.get("/api");
    },

    // This function posts new searches to our database.
    postSaved: function(location) {
        return axios.post("/api", {article: article});
    }
};

// We export the API helper
module.exports = helper;
