// Include React
var React = require("react");

// Helper for making AJAX requests to our API
var helpers = require("../../utils/helpers");

import ArticleActions from '../../actions/ArticleActions';

// This is the History component. It will be used to show a log of  recent searches.
var Saved = React.createClass({

    deleteArticle: function(articleID, callback) {
        // helpers.deleteSaved(articleID)
        // // This happens to work fast enough that it doesn't matter, but why doesn't it work in promise?
        // helpers.getSaved().then(function(response) {
        //     callback(response.data);
        //   });

        ArticleActions.deleteArticle(articleID);
        ArticleActions.receiveArticles();
    },
    // Here we describe this component's render method
    render: function() {
        var self = this;
        var setSaved = this.props.setSaved;
        return (

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">Saved Articles</h3>
                </div>
                <div className="panel-body">

                    {/* Here we use a map function to loop through an array in JSX */}
                    {this.props.savedArticles.map(function(search, i) {
                        return (
                            <div key={i}>
                                <div data-id={search._id} className="savedArticle row">
                                    <div className="col-md-10 savedArticleText">
                                        <p>Title: {search.title}</p>
                                        <p>Date: {search.date}</p>
                                        <p>URL: <a href={search.url}>{search.url} </a></p>
                                    </div>
                                    <div className="col-md-2 savedArticleButtons">
                                        <button onClick={() => self.deleteArticle(search._id, setSaved)} className="btn btn-primary">Delete</button>
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
module.exports = Saved;
