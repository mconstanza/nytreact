// Include React
var React = require("react");

// This is the History component. It will be used to show a log of  recent searches.
var Saved = React.createClass({
    // Here we describe this component's render method
    render: function() {
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
                                <div className="savedArticle row">
                                    <div className="col-md-11 savedArticleText">
                                        <h4>Title: {search.title}</h4>
                                        <h4>Date: {search.date}</h4>
                                        <h4>URL: {search.url}</h4>
                                    </div>
                                    <div className="col-md-1 savedArticleButtons">
                                        <button className="btn btn-primary">Delete</button>
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
