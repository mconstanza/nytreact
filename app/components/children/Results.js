// Include React
var React = require("react");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Results component
var Results = React.createClass({

    // Here we render the function
    render: function() {
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
                                <div className="col-md-11 articleText">
                                    <h4>Title: {search.headline.main}</h4>
                                    <h4>Date: {search.pub_date}</h4>
                                    <h4>URL: {search.web_url}</h4>
                                </div>
                                <div className="col-md-1 articleButtons">
                                    <button onClick={() => helpers.postSaved(search)} className="btn btn-primary">Save</button>
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
