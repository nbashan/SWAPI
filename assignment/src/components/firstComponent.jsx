import React, { Component } from "react";
import { getJsonFile } from "../SWAPI";

class SWAPI extends Component {
  state = {
    pageNumber: 1,
    json: [],
    data: "",
    hasPrevious: false,
    hasNext: false,
    has_data: false,
  };
  navigate = (num_page) => {
    num_page = this.state.pageNumber + num_page;
    let result;
    result = getJsonFile(num_page);
    if (result && !result["detail"]) {
      this.setState({ pageNumber: num_page });
      this.setState({
        json: result["results"].map((element) => element),
      });
      this.setState({ hasPrevious: result["previous"] != null });
      this.setState({ hasNext: result["next"] != null });
      console.log("prev", result["previous"], this.state.hasPrevious);
      console.log("hasNext", result["next"], this.state.hasNext);
    }
  };

  presentData = (tag) => {
    this.setState({ data: JSON.stringify(tag) });
  };

  refresh = () => {
    let result;
    result = getJsonFile(this.state.pageNumber);
    if (result && !result["detail"]) {
      this.setState({
        json: result["results"].map((element) => element),
      });
      this.setState({ hasPrevious: result["previous"] != null });
      this.setState({ hasNext: result["next"] != null });
      this.setState({ has_data: true });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ul>
          {this.state.json.map((tag) => (
            <li key={tag["name"]}>
              <button onClick={() => this.presentData(tag)}>
                {tag["name"]}
              </button>
            </li>
          ))}
        </ul>
        {this.state.hasPrevious && (
          <button onClick={() => this.navigate(-1)}>
            {this.state.pageNumber - 1}
          </button>
        )}
        {this.state.json && <span>{this.state.pageNumber}</span>}
        {this.state.hasNext && (
          <button onClick={() => this.navigate(1)}>
            {this.state.pageNumber + 1}
          </button>
        )}
        {!this.state.has_data && (
          <button onClick={this.refresh}>getPlayers</button>
        )}
        <h6>{this.state.data}</h6>
      </React.Fragment>
    );
  }
}

export default SWAPI;
