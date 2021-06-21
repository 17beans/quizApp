import React, { useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const Create = (props) => {
  const dispatch = useDispatch();
  const input_text = useRef();
  const quiz = useSelector((state) => state.quiz.name);
  // 컬러셋 참고: https://www.shutterstock.com/ko/blog/pastel-color-palettes-rococo-trend/
  const AddQuiz = () => {
    alert(input_text);
    // dispatch();
  };

  return (
    <Container>
      <Title>퀴즈 만들기</Title>
      <QuizBox>
        질문: {/*n*/}개
        {/* {quiz.map((q, i) => {
          return <ItemStyle></ItemStyle>;
        })} */}
      </QuizBox>
      <InputBox>
        <InputQuiz
          ref={input_text}
          placeholder="질문을 입력해 주세요!"
        ></InputQuiz>
        <BtnAdd onClick={AddQuiz}>추가</BtnAdd>
      </InputBox>
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
  border: 1px solid;
`;
const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  /* background-color: #666; */
`;
const InputQuiz = styled.input`
  width: 60vw;
  padding: 14px;
  border-radius: 30px;
  border: 0px;
  font-size: 16px;
  background-color: #dadafc;
`;
const BtnAdd = styled.button`
  /* height: 100px; */
  width: 20vw;
  /* align-self: center; */
  font-size: 18px;
  border-radius: 25px;
  border: 0px solid transparent;
  background-color: #dadafc;
`;
const BtnNext = styled.button`
  margin-top: 20px;
  height: 50px;
  width: 90vw;
  align-self: center;
  font-size: 22px;
  border-radius: 25px;
  border: 0px;
  background-color: #dadafc;
`;
const ItemStyle = styled.div`
  padding: 16px;
  margin: 8px;
  font-weight: 600;
  color: ${(props) => (props.iscompleted ? "#fff" : "#212121")};
  background-color: ${(props) => (props.iscompleted ? "#673ab7" : "aliceblue")};
`;

export default Create;
