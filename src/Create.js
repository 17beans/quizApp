import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, deleteQuiz } from "./redux/modules/quiz";
import AdSense from "react-adsense";

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

  const AddQuiz = () => {
    if (
      input_text.current.value === "" ||
      input_text.current.value === undefined
    ) {
      alert("빈 질문은 추가할 수 없습니다!");
    } else {
      dispatch(addQuiz(input_text.current.value, radioValue));
      input_text.current.value = "";
      input_text.current.focus();
    }
  };

  const DeleteQuiz = (quiz) => {
    const result = window.confirm("이 퀴즈를 삭제할까요?");
    if (result === true) {
      dispatch(deleteQuiz(quiz));
    }
  };

  const Next = () => {
    // console.log(JSON.stringify(quiz));
    props.history.push("/name");
  };

  const IsNoQuiz = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>퀴즈: {quiz.length}개</div>
        <div
          style={{
            marginTop: "65%",
            fontSize: "20px",
            fontWeight: 600,
            alignSelf: "center",
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
        <ListStyle>
          {quiz.map((q, i) => {
            return (
              <ItemStyle key={q.question.length + i}>
                <div>
                  질문: {q.question}
                  <br />
                  정답: {q.answer}
                </div>
                <ItemDelete
                  onClick={() => {
                    DeleteQuiz(q);
                  }}
                >
                  X
                </ItemDelete>
              </ItemStyle>
            );
          })}
        </ListStyle>
      </div>
    );
  };

  useEffect(() => {
    // input_text.current.focus();
  }, []);

  return (
    <Container>
      <Title>퀴즈 만들기</Title>
      <QuizBox>
        {/* {JSON.stringify(quiz)} */}
        {/* {!quiz.length > 0 ? <IsNoQuiz /> : <IsQuiz />} */}
        {quiz === "" ? <IsNoQuiz /> : <IsQuiz />}
        {/* text */}
        {/* {console.log("quiz: " + JSON.stringify(quiz))} */}
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
      <BtnNext onClick={Next}>다음</BtnNext>

      {/* auto full width responsive ads */}
      <AdSense.Google
        client="ca-pub-3250959123650295"
        slot="5455702891"
        style={{ display: "block", height: "55px" }}
        format="auto"
        responsive="true"
      />
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
// const InputQuiz = styled.input`
//   width: 60vw;
//   padding: 14px;
//   border-radius: 30px;
//   border: 0px;
//   font-size: 16px;
//   background-color: #dadafc;
// `;
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
  background-color: #ffdada;
  &:focus {
    border: 3px solid orange;
  }
`;
const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 60vh;
  overflow-x: hidden;
  overflow-y: auto;
`;
const ItemStyle = styled.div`
  display: flex;
  padding: 16px;
  margin: 8px;
  font-weight: 500;
  background-color: aliceblue;
  text-align: left;
  justify-content: space-between;
`;
const ItemDelete = styled.button`
  width: 12vw;
  height: 6vh;
  border: 0px;
  background-color: #ffdada;
  /* background-color: transparent; */
`;

export default Create;
