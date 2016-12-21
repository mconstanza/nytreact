// Include React
var React = require("react");

// Helper for making AJAX requests to our API
var helpers = require("../../utils/helpers");
import ArticleActions from '../../actions/ArticleActions';

// Creating the Results component
var Results = React.createClass({

        // Saves an article to the DB then gets the latest DB entires to refresh the saved Articles
        // callback is the "setSaved" function passed from Main.js
        saveArticle: function(article, results, setResults) {
            ArticleActions.saveArticle(article);
            ArticleActions.receiveArticles();
            var results = this.removeResultFromResults(article, results)
            setResults(results);

        },

        removeResultFromResults: function(article, results) {
            for (var i = 0; i < results.length; i++) {
              console.log("Results: " + results[i])
              if (results[i].id == article.id) {
                  results.splice(i, 1);
              }
            }
            return results
        },

    // Here we render the function
    render : function() {
        var self = this;
        var setSaved = this.props.setSaved;
        var setResults = this.props.setResults;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h2 className="panel-title text-center">Results</h2>
                </div>
                <div className="panel-body">

                    {this.props.articles.map(function(search, i) {
                        return (
                            <div key={i}>
                                <div className="article row">
                                    <div className="col-md-10 articleText text-left">
                                        <p>Title: {search.headline.main}</p>
                                        <p>Date: {search.pub_date}</p>
                                        <p>URL: <a href={search.web_url}>{search.web_url} </a></p>
                                    </div>
                                    <div className="col-md-2 articleButtons">
                                        <button onClick={() => self.saveArticle(search, self.props.resultsArticles, setResults)} className="btn btn-primary">Save</button>
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
