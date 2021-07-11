import React, { useEffect, useRef } from "react";
import img from "./scc_img01.png";
import { useSelector, useDispatch } from "react-redux";
import { addQuizListFB } from "./redux/modules/quiz";

const Name = (props) => {
  const dispatch = useDispatch();
  const input_text = useRef();
  const quizList = useSelector((state) => state.quiz.quiz);
  // const name = useSelector((state) => state.quiz.name);
  // 컬러셋 참고: https://www.shutterstock.com/ko/blog/pastel-color-palettes-rococo-trend/

  const shareQuiz = async () => {
    // await dispatch(addUserName(input_text.current.value));
    if (input_text.current.value === "") {
      alert("이름 혹은 닉네임을 입력해 주세요!");
    } else {
      let name = input_text.current.value;
      await dispatch(addQuizListFB(name, quizList));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <div
        className="outter"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          padding: "0px 10vw",
          boxSizing: "border-box",
          maxWidth: "400px",
        }}
      >
        <img src={img} style={{ width: "80%", margin: "16px" }} alt="images" />
        <h1
          style={{
            fontSize: "1.5em",
            margin: "0px",
            lineHeight: "1.4",
          }}
        >
          이름을 적어주세요!
        </h1>
        <input
          ref={input_text}
          type="text"
          style={{
            padding: "10px",
            margin: "24px 0px",
            border: "1px solid #dadafc",
            borderRadius: "30px",
            width: "100%",
            // backgroundColor: "#dadafc55",
          }}
          placeholder="이름"
        />
        <button
          id="kakao-link-btn"
          style={{
            padding: "8px 24px",
            backgroundColor: "#dadafc",
            borderRadius: "30px",
            border: "#dadafc",
          }}
          onClick={shareQuiz}
        >
          퀴즈 공유하기
        </button>
      </div>
    </div>
  );
};

export default Name;
