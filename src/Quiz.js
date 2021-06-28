import React, { useEffect, useState } from "react";
import styled from "styled-components";

import SwipeItem from "./SwipeItem";
import { useSelector, useDispatch } from "react-redux";
import { addAnswer } from "./redux/modules/quiz";
import Score from "./Score";
import Progress from "./Progress";

const Quiz = (props) => {
  // state로 관리하자!
  const [num, setNum] = useState(0);
  const [interval, setInterval] = useState(false);
  const quiz = useSelector((state) => state.quiz.quiz);
  // const doc = props.match.params.doc;
  // console.log("doc: " + doc);
  const dispatch = useDispatch();

  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
    let _answer = direction === "left" ? "O" : "X";

    if (_answer === quiz[num].answer) {
      // 정답일 경우
      dispatch(addAnswer(true));
    } else {
      // 오답일 경우
      dispatch(addAnswer(false));
    }
    setNum(num + 1);
  };

  const FnInterval = () => {
    setTimeout(() => {
      setInterval(true);
    }, 1000);
    return <QuizEnd>퀴즈 끝! 점수 계산 중!!</QuizEnd>;
  };

  if (num > quiz.length - 1) {
    return interval ? <Score {...props} /> : FnInterval();
  }

  return (
    <QuizComponent>
      <Progress />
      <p>
        <span>{num + 1}번 문제</span>
      </p>

      {quiz.map((l, i) => {
        if (num === i) {
          return <Question key={i}>{l.question}</Question>;
        }
      })}

      <AnswerZone>
        <Answer>O</Answer>
        <Answer>X</Answer>
      </AnswerZone>

      {quiz.map((l, i) => {
        if (i === num) {
          return <SwipeItem key={i} onSwipe={onSwipe} />;
        }
      })}
    </QuizComponent>
  );
};

const QuizComponent = styled.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 100vw;
  height: 100vh;
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
  font-size: 8em;
  font-weight: 600;
  color: #dadafc77;
`;

const DragItem = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  // & div와 & > div는 같습니다!
  // &와 바로 뒤 태그 사이에서 >는 생략 가능합니다!
  & > div {
    background-color: #ffd6aa;
    border-radius: 75px;
  }
  // & img와 & div > img는 같지 않지만! 적용이 잘 됩니다!
  // 그 이유는 & img는 내부에서 img 태그를 찾아서 적용하라! 이지만 & div > img는 div 내의 img를 찾아서 적용하라! 이기 때문이에요 :)
  & img {
    max-width: 150px;
  }
`;

const QuizEnd = styled.div`
  display: flex;
  font-size: 1.5em;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default Quiz;
