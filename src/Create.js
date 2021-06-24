import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, getQuiz } from "./redux/modules/quiz";

// react-bootstrap
import {
  InputGroup,
  FormControl,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Create = (props) => {
  // 컬러셋 참고: https://www.shutterstock.com/ko/blog/pastel-color-palettes-rococo-trend/
  const dispatch = useDispatch();
  const input_text = useRef();
  let quiz = useSelector((state) => state.quiz.quiz);

  const radios = [
    { name: "O", value: "O" },
    { name: "X", value: "X" },
  ];

  // const [question, setQuestion] = useState();
  const [radioValue, setRadioValue] = useState("O");

  const loadQuiz = () => {
    dispatch(getQuiz());
  };

  const AddQuiz = () => {
    if (
      input_text.current.value === "" ||
      input_text.current.value === undefined
    ) {
      alert("빈 질문은 추가할 수 없습니다!");
    } else {
      dispatch(addQuiz(input_text.current.value, radioValue));
    }
  };

  const Next = () => {};

  useEffect(() => {
    loadQuiz();
  }, []);

  const IsNoQuiz = () => {
    return (
      <div>
        <div>퀴즈: {quiz.length}개</div>
        <div
          style={{
            marginTop: "16px",
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          퀴즈를 추가해 주세요!
        </div>
      </div>
    );
  };

  const IsQuiz = () => {
    return (
      <div>
        질문: {quiz.length} 개
        {quiz.map((q, i) => {
          return (
            <ItemStyle key={i}>
              질문: {q.question}
              <br />
              정답: {q.answer}
            </ItemStyle>
          );
        })}
      </div>
    );
  };

  return (
    <Container>
      <Title>퀴즈 만들기</Title>
      <QuizBox>
        {/* {JSON.stringify(quiz)} */}
        {!quiz.length > 0 ? <IsNoQuiz /> : <IsQuiz />}
      </QuizBox>
      {/* <InputBox> */}
      {/* <InputQuiz
          ref={input_text}
          placeholder="질문을 입력해 주세요!"
        ></InputQuiz> */}
      {/* <BtnAdd onClick={AddQuiz}>추가</BtnAdd> */}
      {/* </InputBox> */}
      <InputGroup className="mb-3">
        <FormControl placeholder="퀴즈를 입력해 주세요!" ref={input_text} />
        <InputGroup.Append>
          <ButtonGroup toggle>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                type="radio"
                variant="light"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
            <Button variant="outline-secondary" onClick={AddQuiz}>
              추가
            </Button>
          </ButtonGroup>
        </InputGroup.Append>
      </InputGroup>
      <BtnNext>다음</BtnNext>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  padding: 5%;
  box-sizing: border-box;
  /* background-color: #eee; */
`;
const Title = styled.div`
  font-size: 24px;
  padding-bottom: 5%;
`;
const QuizBox = styled.div`
  width: 90vw;
  height: 60vh;
  /* background-color: #333; */
  /* border: 1px solid; */
  margin-bottom: 20px;
`;
// const InputBox = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-top: 20px;
//   /* background-color: #666; */
// `;
const InputQuiz = styled.input`
  width: 60vw;
  padding: 14px;
  border-radius: 30px;
  border: 0px;
  font-size: 16px;
  background-color: #dadafc;
`;
// const BtnAdd = styled.button`
//   /* height: 100px; */
//   width: 20vw;
//   /* align-self: center; */
//   font-size: 18px;
//   border-radius: 25px;
//   border: 0px solid transparent;
//   background-color: #dadafc;
// `;
const BtnNext = styled.button`
  margin-top: 3px;
  height: 50px;
  width: 90vw;
  align-self: center;
  font-size: 22px;
  border-radius: 25px;
  border: 0px;
  background-color: #dadafc;
  &:focus {
    border: 3px solid orange;
  }
`;
const ItemStyle = styled.div`
  padding: 16px;
  margin: 8px;
  font-weight: 500;
  background-color: aliceblue;
  text-align: left;
`;

export default Create;
