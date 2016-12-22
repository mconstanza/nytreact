// Include React
var React = require("react");

// Helper for making AJAX requests to our API
var helpers = require("../../utils/helpers");
import ArticleActions from '../../actions/ArticleActions';

// Creating the Results component
var Results = React.createClass({

        // Saves an article to the DB then gets the latest DB entires to refresh the saved Articles
        // callback is the "setSaved" function passed from Main.js
        saveArticle: function(article) {
            ArticleActions.saveArticle(article);
            ArticleActions.receiveArticles();
        },

    // Here we render the function
    render : function() {
        var self = this;
        var setSaved = this.props.setSaved;

        var headingStyle = {
                fontFamily: 'Julius Sans One'
        }

        return (
            <div className="panel panel-default" style={headingStyle}>
                <div className="panel-heading">
                    <h2 className="panel-title text-center"><strong>Results</strong></h2>
                    { !self.props.authenticated && <p>Login to save results</p>}
                </div>
                <div className="panel-body" id="resultsBody">

                    {this.props.articles.map(function(search, i) {
                        return (
                            <div key={i}>
                                <div className="article row">
                                    <div className="col-md-10 articleText text-left">
                                        <p><strong>Title:</strong> {search.headline.main}</p>
                                        <p><strong>Date:</strong> {search.pub_date}</p>
                                        <p><strong>URL:</strong> <a target="blank" href={search.web_url}>{search.web_url} </a></p>
                                    </div>
                                    <div className="col-md-2 articleButtons">
                                      { self.props.authenticated && <button onClick={() => self.saveArticle(search)} className="btn btn-primary">Save</button>}

                                    </div>
                                </div>
                                <hr/>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
});

// Export the component back for use in other files
module.exports = Results;
