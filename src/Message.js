import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import img from "./scc_img01.png";
import { addRankFB } from "./redux/modules/rank";

const Message = (props) => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.quiz.name);
  const answers = useSelector((state) => state.quiz.answers);
  const user_name = useSelector((state) => state.rank.user_name);
  const docRef = useSelector((state) => state.quiz.docRef);

  const input_text = useRef();

  // 정답만 걸러내기
  let correct = answers.filter((a) => {
    return a;
  });

  // 점수 계산하기
  let score = (correct.length / answers.length) * 100;

  useEffect(() => {
    console.log("docRef(Message.js): " + JSON.stringify(docRef));
  }, []);

  // 컬러셋 참고: https://www.shutterstock.com/ko/blog/pastel-color-palettes-rococo-trend/
  return (
    <Container>
      <Outter>
        <Image src={img} />
        <Text>
          <HighLight>{name}</HighLight>
          에게 남기는 한 마디
        </Text>
        <TextInput
          ref={input_text}
          type="text"
          placeholder="한 마디 작성해 주세요!"
        />
        <Button
          onClick={() => {
            let rank_info = {
              score: parseInt(score),
              name: user_name,
              message: input_text.current.value,
              current: true,
              docRef: docRef, // 어떤 quiz 문서에 대한 rank_info인지 구분하기 위해 존재
            };
            // 랭킹 정보 넣기
            // dispatch(addRank(rank_info));
            dispatch(addRankFB(rank_info));
            // 주소 이동
            // connected-react-router로 처리
            // props.history.push("/ranking");
          }}
        >
          남기고 랭킹 보러 가기
        </Button>
      </Outter>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
`;

const Outter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  padding: 0px 10vw;
  box-sizing: border-box;
  max-width: 400px;
`;

const Image = styled.img`
  width: 80%;
  margin: 16px;
`;

const Text = styled.h1`
  font-size: 1.5em;
  margin: 0px;
  line-height: 1.4;
`;

const HighLight = styled.div`
  background-color: #fef5d4;
  padding: 5px 10px;
  border-radius: 30px;
`;

const TextInput = styled.input`
  padding: 10px;
  margin: 24px 0px;
  border: 1px solid #dadafc;
  border-radius: 30px;
  width: 100%;
  // backgroundColor: #dadafc55;
`;

const Button = styled.button`
  padding: 8px 24px;
  background-color: #dadafc;
  border-radius: 30px;
  border: #dadafc;
`;

export default Message;
