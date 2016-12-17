// Include React
var React = require("react");

// Creating the Results component
var Results = React.createClass({
  // Here we render the function
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body text-center">

          {this.props.articles.map(function(search, i) {
            return (
              <div key={i} className = "article">
                <h4>Title: {search.headline.main}</h4>
                <h4>Date: {search.pub_date}</h4>
                <h4>URL: {search.web_url}</h4>
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
