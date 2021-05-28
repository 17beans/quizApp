import React from "react";
import { useState } from "react";
import styled from "styled-components";
import img from "./scc_img01.png";
import TinderCard from "react-tinder-card";
import SwipeItem from "./SwipeItem";

const Quiz = (props) => {
  const [num, setNum] = useState(0);
  const list = props.list;
  const onSwipe = (direction) => {
    setNum(num + 1);
    console.log("You swiped: " + direction);
  };

  return (
    <QuizContainer>
      <p>
        <span>{num + 1}번 문제</span>
      </p>

      {props.list.map((l, idx) => {
        if (num === idx) {
          return <Question key={idx}>{l.question}</Question>;
        }
      })}

      <AnswerZone>
        <Answer>O</Answer>
        <Answer>X</Answer>
      </AnswerZone>

      {props.list.map((l, idx) => {
        if (idx === num) {
          return <SwipeItem key={idx} onSwipe={onSwipe} />;
        }
      })}
    </QuizContainer>
  );
};

const QuizContainer = styled.div`
  text-align: center;
  & > p > span {
    padding: 8px 16px;
    background-color: #fef5d4;
    border-radius: 30px;
  }
`;

const Question = styled.h1`
  font-size: 1.5em;
`;

const AnswerZone = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Answer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10em;
  font-weight: 600;
  color: #dadafc77;
`;

export default Quiz;
