import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addRank } from "./redux/modules/rank";

const Score = (props) => {
  const name = useSelector((state) => state.quiz.name);
  const score_texts = useSelector((state) => state.quiz.score_texts);
  const answers = useSelector((state) => state.quiz.answers);

  // 정답만 걸러내기
  let correct = answers.filter((a) => {
    return a;
  });

  // 점수 계산하기
  let score = (correct.length / answers.length) * 100;

  // 점수 별로 텍스트 띄울 준비!
  let score_text = "";

  Object.keys(score_texts).map((s, i) => {
    // 첫 번째 텍스트 넣어주기
    if (i === 0) {
      score_text = score_texts[s];
    }
    // 실제 점수와 기준 점수(키로 넣었던 점수) 비교해서 텍스트를 넣자!
    score_text = parseInt(s) <= score ? score_texts[s] : score_text;
  });

  return (
    <ScoreContainer>
      <Text>
        <span>{name}</span> 퀴즈에 <br />
        대한 내 점수는?
      </Text>
      <MyScore>
        <span>{score}</span>점<p>{score_text}</p>
      </MyScore>

      <Button
        onClick={() => {
          props.history.push("/message");
        }}
        // outlined
      >
        {name}에게 한마디 남기기
      </Button>
    </ScoreContainer>
  );
};

const ScoreContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.h1`
  font-size: 1.5em;
  margin: 0px;
  line-height: 1.4;
  span {
    background-color: #fef5d4;
    padding: 5px 10px;
    border-radius: 30px;
  }
`;

const MyScore = styled.div`
  text-align: center;
  span {
    background-color: #fef5d4;
    padding: 5px 10px;
    border-radius: 30px;
  }
  font-weight: 600;
  font-size: 2em;
  margin: 24px;
  p {
    margin: 24px 0px;
    font-size: 16px;
    font-weight: 400;
  }
`;

const Button = styled.button`
  padding: 8px 24px;
  background-color: #dadafc;
  border-radius: 30px;
  margin: 8px;
  border: 1px solid #dadafc;
  width: 80vw;
`;

export default Score;
