// Include React
import React, { Component } from 'react';

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var Saved = require("./children/Saved");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// OAuth Configuration
var config = require('../config/config.js');

// Creating the Main component
class AppComponent extends Component {

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = { searchTerm: "", searchStartYear: "", searchEndYear: "",
             resultsArticles: [], savedArticles: [], authenticated: false};
  }

  // The moment the page renders get the History
  componentDidMount() {
    helpers.getSaved().then(function(response){
      if(response !== this.state.savedArticles){
        this.setState({savedArticles: response.data});
      }
    }.bind(this));
  }

  componentWillMount() {
    this.lock = new Auth0Lock(config.auth0ClientId, config.domain);
  }

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate() {

    // Run the query for the articles
    helpers.runQuery(this.state.searchTerm, this.state.searchStartYear, this.state.searchEndYear).then(function(data) {
      if (data !== this.state.resultsArticles) {
        console.log("Articles", data);
        this.setState({ resultsArticles: data });
      }
    }.bind(this));
  }

  login() {
    // We can call the show method from Auth0Lock,
    // which is passed down as a prop, to allow
    // the user to log in
    this.lock.show((err, profile, token) => {
      if (err) {
        alert(err);
        return;
      }
      this.setState({authenticated: true});
    });
  }

  logout() {
    // AuthActions.logUserOut();
    this.setState({authenticated: false});
  }

  // This function allows childrens to update the parent.
  setTerm(term) {
    this.setState({ searchTerm: term });
  }

  // This function allows the Results to update the Saved Articles
  setSaved(articles) {
    this.setState({ savedArticles: articles });
  }

  // Here we render the function
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">NYT - React</h2>
            {!this.state.authenticated &&
            <button onClick = {this.login} className = "btn btn-success">Login</button>
          }
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
}

// Export the component back for use in other files
module.exports = AppComponent;
