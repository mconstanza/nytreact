// Include React
import React, {Component} from 'react';

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var Saved = require("./children/Saved");

// Helper for making AJAX requests to our API
var helpers = require("../utils/helpers");

// OAuth Configuration
var config = require('../config/config.js');
import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';

// Flux Architecture
import ArticleActions from '../actions/ArticleActions';
import ArticleStore from '../stores/ArticleStore';

// Creating the Main component
class AppComponent extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            searchTerm: "",
            searchStartYear: "",
            searchEndYear: "",
            resultsArticles: [],
            savedArticles: [],
            authenticated: AuthStore.isAuthenticated()
        };

        this.onChange = this.onChange.bind(this);

        // This function allows childrens to update the parent.
        this.setTerm = (term) => {
            this.setState({searchTerm: term});
        }

        // This function allows the Results to update the Saved Articles
        this.setSaved = (articles) => {
            this.setState({savedArticles: articles});
        }

        this.setResults = (articles) => {
            this.setState({resultsArticles: articles});
        }
    }

    // The moment the page renders get the History
    componentDidMount() {

        ArticleActions.receiveArticles()

    }

    componentWillMount() {
        this.lock = new Auth0Lock(config.auth0ClientId, config.domain);
        ArticleStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        ArticleStore.removeChangeListener(this.onChange);
    }

    onChange() {

        this.setState({savedArticles: ArticleStore.getSavedArticles()});
    }

    // If the component changes (i.e. if a search is entered)...
    componentDidUpdate() {

        // Run the query for the articles
        helpers.runQuery(this.state.searchTerm, this.state.searchStartYear, this.state.searchEndYear).then(function(data) {
            if (data !== this.state.resultsArticles) {
                console.log("Articles", data);
                this.setState({resultsArticles: data});
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
            AuthActions.logUserIn(profile, token)
            this.setState({authenticated: AuthStore.isAuthenticated()})
            this.setState({savedArticles: ArticleActions.receiveArticles()})

        })
    }

    logout() {
        AuthActions.logUserOut();
        this.setState({
            searchTerm: "",
            searchStartYear: "",
            searchEndYear: "",
            resultsArticles: [],
            savedArticles: [],
            authenticated: AuthStore.isAuthenticated()
        });
    }

    // Here we render the function
    render() {

        var headingStyle = {
            fontFamily: 'Julius Sans One'
        }

        var jumboStyle = {
            background: 'transparent'
        }
        return (
            <div className="container" style={headingStyle}>
                <div className="row">
                    <div style={jumboStyle} className="jumbotron text-center">
                        <h2 className="text-center">NYT - React</h2>
                        <p>Search for and save articles from the New York Times</p>
                        <hr/> {!this.state.authenticated && <button onClick={this.login} className="btn btn-success">Login/Signup</button>}
                        {this.state.authenticated && <button onClick={this.logout} className="btn btn-danger">Logout</button>}

                    </div>

                    <div className="row">

                        <div className="col-md-6">
                            <Form authenticated={this.state.authenticated} setTerm={this.setTerm} resultsArticles={this.state.resultsArticles} setSaved={this.setSaved} setResults={this.setResults}/>
                        </div>

                        <div className="col-md-6">
                            <Saved authenticated={this.state.authenticated} savedArticles={this.state.savedArticles} setSaved={this.setSaved}/> {/* <Results articles={this.state.resultsArticles} setSaved={this.setSaved}/> */}

                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

// Export the component back for use in other files
module.exports = AppComponent;
