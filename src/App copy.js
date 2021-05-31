import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Start from "./Start";
import Quiz from "./Quiz";
import Score from "./Score";
import Message from "./Message";
import Ranking from "./Ranking";

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  load: () => {},
});

class App extends React.Component {
  constructor(props) {
    super(props);
    // state에 필요한 데이터를 넣어줘요!
    this.state = {
      // name: "최규빈",
      // page: "message",
      // scoreMsg: "이 정도면 아주 친한 친구 사이! 앞으로도 더 친하게 지내요! :)",
      // list: [
      //   { question: "르탄이는 2살이다.", answer: "O" },
      //   { question: "르탄이는 2살이다.", answer: "O" },
      //   { question: "르탄이는 2살이다.", answer: "O" },
      //   { question: "르탄이는 2살이다.", answer: "O" },
      //   { question: "르탄이는 2살이다.", answer: "O" },
      //   { question: "르탄이는 2살이다.", answer: "O" },
      //   { question: "르탄이는 2살이다.", answer: "O" },
      //   { question: "르탄이는 2살이다.", answer: "O" },
      //   { question: "르탄이는 2살이다.", answer: "O" },
      //   { question: "르탄이는 2살이다.", answer: "O" },
      //   { question: "르탄이는 2살이다.", answer: "O" },
      // ],
      ranking: [
        { rank: 1, name: "임민영", message: "안녕 르탄아!" },
        { rank: 1, name: "임민영", message: "안녕 르탄아!" },
        { rank: 1, name: "임민영", message: "안녕 르탄아!" },
        { rank: 1, name: "임민영", message: "안녕 르탄아!" },
        { rank: 1, name: "임민영", message: "안녕 르탄아!" },
        { rank: 1, name: "임민영", message: "안녕 르탄아!" },
        { rank: 1, name: "임민영", message: "안녕 르탄아!" },
      ],
    };
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Start}></Route>
          <Route path="/quiz" exact component={Quiz}></Route>
          <Route path="/score" exact component={Score}></Route>
          <Route path="/message" exact component={Message}></Route>
          <Route path="/ranking" exact component={Ranking}></Route>
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
