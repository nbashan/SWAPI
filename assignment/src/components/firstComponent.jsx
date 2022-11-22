import React, { Component } from "react";
import { getJsonFile } from "../SWAPI";
import Header from "./Header";
import "./buttons.css";

class SWAPI extends Component {
  state = {
    pageNumber: 1,
    json: [],
    jsonData: [],
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
    let temp_data = [];
    for (let key in tag) {
      temp_data.push(
        <tr>
          <td>{key}</td>
          <td>{tag[key]}</td>
        </tr>
      );
    }
    this.setState({ jsonData: temp_data });
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
        <Header />
        <ul>
          {this.state.json.map((tag) => (
            <li key={tag["name"]}>
              <button
                className="playerName"
                onClick={() => this.presentData(tag)}
              >
                {tag["name"]}
              </button>
            </li>
          ))}
        </ul>
        {this.state.hasPrevious && (
          <button className="nextPage" onClick={() => this.navigate(-1)}>
            {this.state.pageNumber - 1}
          </button>
        )}
        {this.state.json && <span>{this.state.pageNumber}</span>}

        {this.state.hasNext && (
          <button className="nextPage" onClick={() => this.navigate(1)}>
            {this.state.pageNumber + 1}
          </button>
        )}
        {!this.state.has_data && (
          <button className="nextPage" onClick={this.refresh}>
            getPlayers
          </button>
        )}
        <div>
          <table border="2">
            <tbody>
              <tr>
                <th>KEY</th>
                <th>VALUE</th>
              </tr>
              {this.state.jsonData}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default SWAPI;
