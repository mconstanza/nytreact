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

          <h4>Title:</h4>
          <p>{this.props.title}</p>

          <h4>Date:</h4>
          <p>{this.props.date}</p>

          <h4>URL:</h4>
          <p>{this.props.url}</p>
      </div>
    </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;
