// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var Saved = require("./children/Saved");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { searchTerm: "", searchStartYear: "", searchEndYear: "",
             resultsArticles: [], savedArticles: [] };
  },

  // The moment the page renders get the History
  componentDidMount: function() {
    helpers.getSaved().then(function(response){
      if(response !== this.state.savedArticles){
        this.setState({savedArticles: response.data});
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {

    // Run the query for the articles
    helpers.runQuery(this.state.searchTerm, this.state.searchStartYear, this.state.searchEndYear).then(function(data) {
      if (data !== this.state.resultsArticles) {
        console.log("Articles", data);
        this.setState({ resultsArticles: data });
      }
    }.bind(this));
  },
  // This function allows childrens to update the parent.
  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },

  // This function allows the Results to update the Saved Articles
  setSaved: function(articles) {
    this.setState({ savedArticles: articles });
  },

  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">NYT - React</h2>

          </div>

          <div className="row">

            <Form setTerm={this.setTerm} />

          </div>

          <div className="row">

            <Results articles={this.state.resultsArticles} setSaved={this.setSaved} />

          </div>

        </div>

        <div className="row">

          <Saved savedArticles={this.state.savedArticles} setSaved={this.setSaved} />

        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
