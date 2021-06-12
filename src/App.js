import "./App.css";
import React from "react";

import Start from "./Start";
import Quiz from "./Quiz";
import Score from "./Score";
import Ranking from "./Ranking";
import Message from "./Message";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import NotFound from "./NotFound";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {},
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="App">
        {/* {this.state.page === "start" && (
                    <Start name={this.state.name} />
                )}
                {this.state.page === "quiz" && <Quiz list={this.state.list} />}
                {this.state.page === "score" && (
                    <Score
                        scoreMsg={this.state.scoreMsg}
                        name={this.state.name}
                    />
                )}
                {this.state.page === "ranking" && <Ranking />}
                {this.state.page === "message" && (
                    <Message name={this.state.name} />
                )} */}
        {/* <Start name={this.state.name} /> */}
        {/* <Quiz /> */}
        {/* <Score /> */}

        <Switch>
          <Route path="/" exact component={Start} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/score" component={Score} />
          <Route path="/message" component={Message} />
          <Route path="/ranking" component={Ranking} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
