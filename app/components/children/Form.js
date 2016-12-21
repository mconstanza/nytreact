// Include React
var React = require("react");

var Results = require("./Results")

// Creating the Form component
var Form = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { topic: "",
            startYear: "",
            endYear: ""
   };
  },

  // This function will respond to the user input
  handleChange: function(event) {

    this.setState({ topic: event.target.value });

  },

  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    // Set the parent to have the search term
    this.props.setTerm(this.state.topic);
    this.setState({ topic: "" });
  },
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search</h3>
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h5 className="">
                <strong>Article Topic</strong>
              </h5>

              <input
                value={this.state.topic}
                type="text"
                className="form-control text-center"
                id="topic"
                onChange={this.handleChange}
                required
              />
              <br />

              <h5 className="">
                <strong>Start Year</strong>
              </h5>

              <input
                value={this.state.startYear}
                type="text"
                className="form-control text-center"
                id="startYear"
                onChange={this.handleChange}
              />
              <br />

              <h5 className="">
                <strong>End Year</strong>
              </h5>

              <input
                value={this.state.endYear}
                type="text"
                className="form-control text-center"
                id="endYear"
                onChange={this.handleChange}
              />
              <br />

              <button
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          <Results articles={this.props.resultsArticles} setSaved={this.props.setSaved} setResults = {this.props.setResults}/>
        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Form;
